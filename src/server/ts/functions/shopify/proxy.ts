import { Serverless } from "../../serverless";
import { Fetch } from "../../../../shared/ts/fetch";
import { Webtoken } from "../../services";

export const shopifyProxyHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.body;

  if(!query.path || !query.method) {
    throw {
      statusCode: 400,
      body: "Missing `path` or `method` param.",
    }
  }

  const response = await new Fetch({
    host: request.webtoken.domain,
    path: query.path,
    port: 443,
    method: query.method,
    headers: {
      "X-Shopify-Access-Token": request.webtoken.accessToken
    }
  }).exec(query.payload);


  if(response.errors) {
    throw {
      statusCode: 500,
      body: response.errors,
    }
  }

  return {
    statusCode: 200,
    body: response,
  }
}

export const handler = Serverless.handle(Webtoken.middleware, shopifyProxyHandler);

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    body: {
      path: string;
      method: string;
      payload: any;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    body: string;
  }
}
