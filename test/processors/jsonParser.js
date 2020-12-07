/**
 * @typedef {import('../../main').Request} Request
 * @typedef {import('../../main').Response} Response
 * @typedef {Response & { body: string; }} ResponseWithBody
 * @return {(req: Request, res: Response) => Promise<ResponseWithBody>}
 */
export const jsonParser = () => {
  /**
   * @param {Request} req
   * @param {Response} res
   * @return {Promise<ResponseWithBody>}
   */
  const jsonParserProcessor = async(req, res) => {
    const newRes = /** @type {ResponseWithBody} */ (res);

    if (req.headers['content-type'] === 'application/json') {
      newRes.body = await res.json();
    }

    return newRes;
  };

  return jsonParserProcessor;
};
