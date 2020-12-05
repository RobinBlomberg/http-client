/**
 * A HTTP client.
 */
export class Client {
    /**
     * @param {string | null} [baseUrl]
     */
    constructor(baseUrl?: string | null | undefined);
    /**
     * Sends a CONNECT request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    connect(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a DELETE request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    delete(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a GET request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    get(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a HEAD request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    head(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a OPTIONS request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    options(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a PATCH request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    patch(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a POST request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    post(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a PUT request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    put(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a HTTP request.
     *
     * @since 0.1.0
     * @param {Method} method
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    request(method: Method, url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * Sends a TRACE request.
     *
     * @since 0.1.0
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    trace(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    #private;
}
export type Method = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";
export type RequestOptions = {
    body?: string | undefined;
    headers?: import("./types.js").Headers | undefined;
};
import { Response } from "./Response.js";
