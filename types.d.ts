import * as Http from 'http';
import { Stream } from '@robinblomberg/stream';

export class Client {
  connect(url: string, options: RequestOptions = {}): Promise<Response>;
  delete(url: string, options: RequestOptions = {}): Promise<Response>;
  get(url: string, options: RequestOptions = {}): Promise<Response>;
  head(url: string, options: RequestOptions = {}): Promise<Response>;
  options(url: string, options: RequestOptions = {}): Promise<Response>;
  patch(url: string, options: RequestOptions = {}): Promise<Response>;
  post(url: string, options: RequestOptions = {}): Promise<Response>;
  put(url: string, options: RequestOptions = {}): Promise<Response>;
  request(method: Method, url: string, options: RequestOptions = {}): Promise<Response>;
  trace(url: string, options: RequestOptions = {}): Promise<Response>;
}

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

export type RequestOptions = {
  body?: string;
  headers?: Headers;
};

export class Response extends Stream {
  headers: Headers;
  ok: boolean;
  statusCode: StatusCode;
  statusMessage: string;
  url: string;
  constructor(incomingMessage: Http.IncomingMessage);
}

export type StatusCode =
  | 100 | 101 | 102 | 103
  | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
  | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
  | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415
  | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451
  | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;
