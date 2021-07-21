import express, { json } from "express";

const loggerInfo = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  /**
   * method , url , time
   */
  console.log(
    JSON.stringify(
      {
        method: request.method,
        url: request.url,
        Date: new Date().toLocaleDateString(),
      },
      null,
      3
    )
  );
  next();
};

export default loggerInfo;
