import { Serverless } from "../../serverless";
import { Webtoken, Database } from "../../services";
import * as cookie from "cookie";

export const databaseFindHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.body;

  return {
    statusCode: 200,
    body: await Database.Find("templates", "", {}),
  }
}

export const handler = Serverless.handle(Webtoken.middleware, databaseFindHandler);

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    body: {
      schema: string;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    body: any;
  }
}
