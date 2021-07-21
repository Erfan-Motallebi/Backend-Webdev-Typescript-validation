import express from "express";
import loggerInfo from "./middlewares/loggerInfo";
import apiRouter from "./routers/apiRouter";

const app: express.Application = express();

const hostName: string = "127.0.0.1";
const port: number = 5010;

app.use(express.json());

app.use(loggerInfo);

app.get("/", (request: express.Request, response: express.Response) => {
  response.status(200).send(`
        <h1>Welcome to my home page</h1>
        `);
});

app.use("/api", apiRouter);

app.listen(port, hostName, () => {
  console.info(`Express server is started at http://${hostName}:${port}`);
});
