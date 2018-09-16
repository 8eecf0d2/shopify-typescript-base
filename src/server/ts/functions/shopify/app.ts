import { Serverless } from "../../serverless";
import { Webtoken } from "../../services";
import * as cookie from "cookie";
import * as path from "path";
import * as fs from "fs";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  // TODO: Figure out how to deploy / serve static files
  const html = () => ({
    mime: "text/html",
    file: fs.readFileSync(path.resolve(__dirname, "../../../../../../../src/client/html/index.html"), "utf8")
  });
  const javascript = () => ({
    mime: "text/javascript",
    file: fs.readFileSync(path.resolve(__dirname, "../../../../../../client.js"), "utf8")
  });

  const javascriptMap = () => ({
    mime: "text/javascript",
    file: fs.readFileSync(path.resolve(__dirname, "../../../../../../client.js.map"), "utf8")
  });

  const payload = request.path.match(/client.js/) ? request.path.match(/client.js.map/) ? javascriptMap() : javascript() : html();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": payload.mime,
    },
    body: payload.file,
  }
}

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    path: string;
  }
  export interface Response extends Serverless.Handler.Response {
    body: string;
  }
}
