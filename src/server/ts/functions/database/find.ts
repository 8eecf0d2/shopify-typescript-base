import { Serverless } from "../../serverless";
import { Webtoken } from "../../services";
import { Database } from "../../../../shared/ts/database";

export const databaseFindHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const database = new Database();
  const query = request.body;
  const search = {
    ...query.search,
    shop: request.webtoken.shop,
  };

  let result;

  switch(query.schema) {
    case "template":
      result = await database.template.query(query.search);
      break;
  }

  return {
    statusCode: 200,
    body: {
      items: result,
      count: result.length,
    },
  }
}

export const handler = Serverless.handle(Webtoken.middleware, databaseFindHandler);

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    body: {
      schema: string;
      search: any;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    body: any;
  }
}
