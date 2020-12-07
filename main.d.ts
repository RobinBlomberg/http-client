import { IncomingMessage } from 'http';
import { Stream } from '@robinblomberg/stream';

/*
 * Internal types
 * -------------------------------------------------------------------------------------------------
 */

export type Headers = {
  [HeaderName: string]: string | string[];
};

/**
 * @see https://tools.ietf.org/html/rfc2616
 * @see https://tools.ietf.org/html/rfc5789
 */
export type Method =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

export type Processor = (req: Request, res: Response) => Promiseable<Response>;

export type ProcessorsPayload = (Processor | ProcessorsPayload)[];

export type Promiseable<T> = T | Promise<T>;

export type Request = {
  body: string | null;
  headers: Headers;
  method: Method;
  url: string;
};

export type RequestOptions = {
  body?: string;
  headers?: Headers;
};

/**
 * A HTTP IncomingMessage wrapper.
 *
 * @since 0.1.0
 */
export class Response extends Stream {
  headers: Headers;
  ok: boolean;
  statusCode: StatusCode;
  statusMessage: string;
  url: string;
  constructor(incomingMessage: IncomingMessage);
}

export type StatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415
  | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

/*
 * External types
 * -------------------------------------------------------------------------------------------------
 */

/**
 * A HTTP client.
 *
 * @since 0.1.0
 */
export class Client<T extends Response & { [K: string]: unknown; }> {
  constructor(baseUrl?: string | null): void;

  /**
   * Sends a CONNECT request.
   *
   * @since 0.1.0
   */
  connect(url: string, options?): Promise<T>;

  /**
   * Sends a DELETE request.
   *
   * @since 0.1.0
   */
  delete(url: string, options?): Promise<T>;

  /**
   * Sends a GET request.
   *
   * @since 0.1.0
   */
  get(url: string, options?): Promise<T>;

  /**
   * Sends a HEAD request.
   *
   * @since 0.1.0
   */
  head(url: string, options?): Promise<T>;

  /**
   * Sends a OPTIONS request.
   *
   * @since 0.1.0
   */
  options(url: string, options?): Promise<T>;

  /**
   * Sends a PATCH request.
   *
   * @since 0.1.0
   */
  patch(url: string, options?): Promise<T>;

  /**
   * Sends a POST request.
   *
   * @since 0.1.0
   */
  post(url: string, options?): Promise<T>;

  /**
   * Sends a PUT request.
   *
   * @since 0.1.0
   */
  put(url: string, options?): Promise<T>;

  /**
   * Sends a HTTP request.
   *
   * @since 0.1.0
   */
  request(method: Method, url: string, options?: RequestOptions): Promise<T>;

  /**
   * Sends a TRACE request.
   *
   * @since 0.1.0
   */
  trace(url: string, options?): Promise<T>;

  /**
   * Adds response processors.
   * These will be executed in order for every router request.
   *
   * @since 0.3.0
   */
  use(...processors: ProcessorsPayload): void;
}
