/**
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('../types').Headers} Headers
 * @typedef {import('../types').Response} ResponseImpl
 * @typedef {import('../types').StatusCode} StatusCode
 */
import { Stream } from '@robinblomberg/stream';

/**
 * @implements {ResponseImpl}
 */
export class Response extends Stream {
  /** @type {Headers} */
  headers;

  /** @type {boolean} */
  ok;

  /** @type {StatusCode} */
  statusCode;

  /** @type {string} */
  statusMessage;

  /** @type {string} */
  url;

  /**
   * @param {IncomingMessage} incomingMessage
   */
  constructor(incomingMessage) {
    super(incomingMessage);

    this.headers = /** @type {Headers} */ (incomingMessage.headers);
    this.statusCode = /** @type {StatusCode} */ (incomingMessage.statusCode);
    this.ok = this.statusCode >= 200 && this.statusCode < 300;
    this.statusMessage = /** @type {string} */ (incomingMessage.statusMessage);
    this.url = /** @type {string} */ (incomingMessage.url);
  }
}
