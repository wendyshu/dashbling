import * as assets from "./assets";
import { ClientConfig } from "@dashbling/core/src/lib/clientConfig";

const addMiddleware = (server: any, middleware: any) => {
  server.ext("onRequest", (request: any, h: any) => {
    const req = request.raw.req;
    const res = request.raw.res;

    return new Promise((resolve, reject) => {
      middleware(req, res, (err: any) => {
        if (err) {
          return reject(err);
        }

        resolve(h.continue);
      });
    });
  });
};

export const install = (server: any, clientConfig: ClientConfig) => {
  assets.devMiddlewares(clientConfig).forEach((middleware: any) => {
    addMiddleware(server, middleware);
  });

  return Promise.resolve();
};
