/**
 * @typedef {import('../../main').Response} Response
 */

import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';
import { describe, equal, it } from '@robinblomberg/test';
import { Client } from '../../lib/index.js';
import { jsonParser } from '../processors/index.js';

const PORT = 3000;

export const testProcessors = () => describe('processor support', () => {
  return it('should transform responses correctly', async() => {
    const server = Http.createServer(async(req, res) => {
      if (req.method === 'POST' && req.url === '/User') {
        const stream = new Stream(req);
        const data = await stream.text();
        res.end(data);
      }
    });

    server.listen(PORT);

    const client = new Client(`http://localhost:${PORT}`);

    client.use(jsonParser());

    const res = await client.post('/User', {
      body: '{"name":42}',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    equal(
      res.body,
      {
        name: 42
      }
    );

    server.close();
  });
});
