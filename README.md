# HTTP Client

## Installation

```
npm install --save-dev @robinblomberg/http-client
```

## Usage

```javascript
import * as Assert from 'assert';
import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';
import { Client } from './index.js';

const PORT = 3000;

const server = Http.createServer(async(req, res) => {
  const stream = new Stream(req);
  const data = await stream.text();
  res.end(data);
});

server.listen(PORT);

(async() => {
  const client = new Client();

  const req = await client.post(`http://localhost:${PORT}`, {
    body: '{"name":42}',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // eslint-disable-next-line no-unused-vars
  const { headers: { date, ...otherHeaders }, ...otherProperties } = req;

  Assert.deepStrictEqual(
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
  Assert.deepStrictEqual(
    await req.json(),
    {
      name: 42
    }
  );

  server.close();
})();
```
