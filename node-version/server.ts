import { ApiRouter } from "./routers/ApiRouter";
import { readFile } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { createServer, Server } from "http";
import path from "path/posix";
import { StringUtils } from "./utils/StringUtil";

const hostName: string = "127.0.0.1";
const PORT: number = 5005;

const server: Server = createServer(
  (Req: IncomingMessage, Res: ServerResponse) => {
    Res.statusCode = 200;
    Res.statusMessage = "Successful";
    Res.setHeader("Content-Type", "application/json; text/html");
    const url: string | undefined = Req.url;
    const method: string | undefined = Req.method;
    // ! Routes
    // ApiRouter.mapRoutes(Req, Res);
  }
);

server.listen(PORT, hostName, () => {
  console.log(`Listening to http://${hostName}:${PORT} `);
});
