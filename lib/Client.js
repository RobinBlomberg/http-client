/**
 * @typedef {import('../main').Headers} Headers
 * @typedef {import('../main').Method} Method
 * @typedef {import('../main').Processor} Processor
 * @typedef {import('../main').ProcessorsPayload} ProcessorsPayload
 * @typedef {import('../main').Request} Request
 * @typedef {import('../main').RequestOptions} RequestOptions
 */
import * as Http from 'http';
import { Url } from '@robinblomberg/url';
import { Response } from './Response.js';

/**
 * @param {Method} method
 * @param {string} url
 * @param {string | null} body
 * @param {Headers} headers
 * @return {Request}
 */
const _createRequest = (method, url, body, headers) => {
  /** @type {Headers} */
  const lowercaseHeaders = {};

  for (const name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name)) {
      lowercaseHeaders[name.toLowerCase()] = headers[name];
    }
  }

  return {
    body,
    headers: lowercaseHeaders,
    method,
    url
  };
};

/**
 * A HTTP client.
 *
 * @since 0.1.0
 * @template {Response & { [K: string]: unknown; }} T
 */
export class Client {
  /** @type {string | null} */
  #baseUrl;

  /** @type {Processor[]} */
  #processors = [];

  /**
   * @param {string | null} [baseUrl]
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl
      ? Url.normalize(baseUrl)
      : null;
  }

  /**
   * Sends a CONNECT request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  connect(url, options = {}) {
    return this.request('CONNECT', url, options);
  }

  /**
   * Sends a DELETE request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  delete(url, options = {}) {
    return this.request('DELETE', url, options);
  }

  /**
   * Sends a GET request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  get(url, options = {}) {
    return this.request('GET', url, options);
  }

  /**
   * Sends a HEAD request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  head(url, options = {}) {
    return this.request('HEAD', url, options);
  }

  /**
   * Sends a OPTIONS request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  options(url, options = {}) {
    return this.request('OPTIONS', url, options);
  }

  /**
   * Sends a PATCH request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  patch(url, options = {}) {
    return this.request('PATCH', url, options);
  }

  /**
   * Sends a POST request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  post(url, options = {}) {
    return this.request('POST', url, options);
  }

  /**
   * Sends a PUT request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  put(url, options = {}) {
    return this.request('PUT', url, options);
  }

  /**
   * Sends a HTTP request.
   *
   * @since 0.1.0
   * @param {Method} method
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  request(method, url, options = {}) {
    return new Promise((resolve) => {
      const requestUrl = this.#baseUrl
        ? Url.join(this.#baseUrl, url)
        : url;

      const request = _createRequest(method, url, options.body ?? null, options.headers ?? {});

      const req = Http.request(requestUrl, { method }, async(res) => {
        const response = new Response(res);

        for (const processor of this.#processors) {
          await processor(request, response);
        }

        resolve(/** @type {any} */ (response));
      });

      if (options.headers !== undefined) {
        for (const name in options.headers) {
          if (Object.prototype.hasOwnProperty.call(options.headers, name)) {
            req.setHeader(name, options.headers[name]);
          }
        }
      }

      if (options.body !== undefined) {
        req.write(options.body);
      }

      req.end();
    });
  }

  /**
   * Sends a TRACE request.
   *
   * @since 0.1.0
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<T>}
   */
  trace(url, options = {}) {
    return this.request('TRACE', url, options);
  }

  /**
   * Adds response processors.
   * These will be executed in order for every router request.
   *
   * @since 0.3.0
   * @param {ProcessorsPayload} processors
   */
  use(...processors) {
    this.#processors.push(...processors.flat(Infinity));
  }
}
