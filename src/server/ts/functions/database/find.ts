import { Serverless } from "../../serverless";
import { Webtoken } from "../../services";
import { Database } from "../../../../shared/ts/database";
import * as cookie from "cookie";

export const databaseFindHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.body;

  const database = new Database();

  return {
    statusCode: 200,
    body: {
      templates: await database.template.scan().exec(),
    }
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
