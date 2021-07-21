import { IncomingMessage, ServerResponse } from "http";

type Password = string | number;

export class ApiRouter {
  /**
   * static mapRoutes
   */
  public static mapRoutes(request: IncomingMessage, response: ServerResponse) {
    const url: string | undefined = request.url;
    const method: string | undefined = request.method;

    if (url === "/" && method === "GET") {
      response.end(
        `<pre style="color: purple">Welcome to my NodeJS Backend Developer</pre>`
      );
    } else if (url === "/about" && method === "GET") {
      response.end(`<pre style="color: red">About us</pre>`);
    } else if (url === "/services" && method === "GET") {
      response.end(`<pre style="color: red">Our Services</pre>`);
    } else if (url === "/user" && method === "POST") {
      let body: {
        name: string;
        password: Password;
      };
      request
        .on("data", (chunk: any) => {
          body = JSON.parse(chunk);
        })
        .on("end", () => {
          console.log(typeof body);

          if (body.name === "Eric" && body.password === "Motallebi") {
            response.end(
              JSON.stringify({
                success: true,
                confirmed: true,
                body,
              })
            );
          } else {
            response.end(
              JSON.stringify({
                failed: true,
                data: [],
              })
            );
          }
        })
        .on("error", (error) => {
          response.end(JSON.stringify(error));
        });
    } else {
      response.end(`<pre><h1>Not Found</h1></pre>`);
    }
  }
}
