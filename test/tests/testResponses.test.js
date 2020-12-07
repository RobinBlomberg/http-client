import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';
import { describe, equal, it } from '@robinblomberg/test';
import { Client } from '../../lib/index.js';

const PORT = 3000;

export const testResponses = () => describe('response properties', () => {
  return it('should return the correct response properties', async() => {
    const server = Http.createServer(async(req, res) => {
      if (req.method === 'POST' && req.url === '/User') {
        const stream = new Stream(req);
        const data = await stream.text();
        res.end(data);
      }
    });

    server.listen(PORT);

    const client = new Client(`http://localhost:${PORT}`);

    const res = await client.post('/User', {
      body: '{"name":42}',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // eslint-disable-next-line no-unused-vars
    const { headers: { date, ...otherHeaders }, ...otherProperties } = res;

    equal(
      {
        headers: otherHeaders,
        ...otherProperties
      },
      {
        headers: {
          connection: 'close',
          'content-length': '11'
        },
        ok: true,
        statusCode: 200,
        statusMessage: 'OK',
        url: ''
      }
    );
    equal(
      await res.json(),
      {
        name: 42
      }
    );

    server.close();
  });
});
