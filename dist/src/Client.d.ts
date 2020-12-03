/**
 * A HTTP client.
 */
export class Client {
    /**
     * @param {string} [baseUrl]
     */
    constructor(baseUrl?: string | undefined);
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    connect(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    delete(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    get(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    head(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    options(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    patch(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    post(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    put(url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
     * @param {Method} method
     * @param {string} url
     * @param {RequestOptions} [options]
     * @return {Promise<Response>}
     */
    request(method: Method, url: string, options?: import("./types.js").RequestOptions | undefined): Promise<Response>;
    /**
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
