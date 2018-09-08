import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as https from "https";
import * as express from "express";
import * as bodyparser from "body-parser";

export class WebServer {
  private server = express();
  private certificates = {
    key: fs.readFileSync("certificates/localhost.key"),
    cert: fs.readFileSync("certificates/localhost.crt"),
  };

  constructor(
    private httpPort: number,
    private httpsPort: number
  ) {
    this.server.use(bodyparser.json())
  }

  public route(options: WebServer.Route.Options): void {
    this.server[options.method](
      options.path,
      options.handler
    );
    console.log(`[web-server]: routing "${options.path}"`);
  }

  public handle(routes: WebServer.Route.Options[]) {
    for(const route of routes) {
      this.route(route);
    }
  }

  public static(external: string|string[], internal: string): void {
    this.route({
      path: external,
      method: "get",
      handler: (request, response) => response.sendFile(path.resolve(internal))
    });
    console.log(`[web-server]: serving "${internal}" → "${external}"`);
  }

  public start(): void {
    http.createServer(this.server).listen(this.httpPort, () => {
      console.log(`[web-server]: started on port "${this.httpPort}" (http)`);
    });
    https.createServer(this.certificates, this.server).listen(this.httpsPort, () => {
      console.log(`[web-server]: started on port "${this.httpsPort}" (https)`);
    });
  }
}

export namespace WebServer {
  export namespace Route {
    export type Method = "get"|"post"; // because these are the only useful http methods in existence.
    export type Request = express.Request;
    export type Response = express.Response;
    export type Handler = (request: WebServer.Route.Request, response: WebServer.Route.Response, next?: express.NextFunction) => void;
    export interface Options {
      method: WebServer.Route.Method;
      path: string|string[];
      handler: WebServer.Route.Handler;
    }
  }
}
