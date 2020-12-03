/**
 * @typedef {import('./types').Method} Method
 * @typedef {import('./types').RequestOptions} RequestOptions
 */
import * as Http from 'http';
import { Url } from '@robinblomberg/url';
import { Response } from './Response.js';

/**
 * A HTTP client.
 */
export class Client {
  /** @type {string | null} */
  #baseUrl;

  /**
   * @param {string | null} [baseUrl]
   */
  constructor(baseUrl) {
    this.#baseUrl = baseUrl
      ? Url.normalize(baseUrl)
      : null;
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  connect(url, options = {}) {
    return this.request('CONNECT', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  delete(url, options = {}) {
    return this.request('DELETE', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  get(url, options = {}) {
    return this.request('GET', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  head(url, options = {}) {
    return this.request('HEAD', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  options(url, options = {}) {
    return this.request('OPTIONS', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  patch(url, options = {}) {
    return this.request('PATCH', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  post(url, options = {}) {
    return this.request('POST', url, options);
  }

  /**
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  put(url, options = {}) {
    return this.request('PUT', url, options);
  }

  /**
   * @param {Method} method
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  request(method, url, options = {}) {
    return new Promise((resolve) => {
      const requestUrl = this.#baseUrl
        ? Url.join(this.#baseUrl, url)
        : url;

      const req = Http.request(requestUrl, { method }, (res) => {
        const response = new Response(res);
        resolve(response);
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
   * @param {string} url
   * @param {RequestOptions} [options]
   * @return {Promise<Response>}
   */
  trace(url, options = {}) {
    return this.request('TRACE', url, options);
  }
}
