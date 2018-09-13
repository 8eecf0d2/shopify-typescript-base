import { Serverless } from "../../serverless";
import { Fetch } from "../../../../../shared/ts/fetch";
import * as cookie from "cookie";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.queryStringParameters;
  const cookies = cookie.parse(request.headers.Cookie);

  if(!cookies.shop || !cookies.token) {
    return {
      statusCode: 403,
      body: "Missing cookies",
    }
  }

  if(!query.path || !query.method) {
    return {
      statusCode: 400,
      body: "Missing `path` or `method` param.",
    }
  }

  const response = await new Fetch({
    host: cookies.shop,
    path: query.path,
    port: 443,
    method: query.method,
    headers: {
      "X-Shopify-Access-Token": cookies.token
    }
  }).exec(query.payload);

  if(response.errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(response.errors),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    queryStringParameters: {
      path: string;
      method: string;
      payload: any;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    body: string;
  }
}
