import { Serverless } from "../../serverless";
import { Fetch } from "../../../../shared/ts/fetch";
import { Webtoken } from "../../services";
import * as cookie from "cookie";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.body;
  const cookies = cookie.parse(String(request.headers.cookie));
  const webtoken = Webtoken.verify(cookies.webtoken);

  if(!webtoken) {
    return {
      statusCode: 403,
      body: "Invalid webtoken.",
    }
  }

  if(!webtoken.access_token) {
    return {
      // TODO: redirect to install page
      statusCode: 403,
      body: "Missing Shopify access token.",
    }
  }

  if(!query.path || !query.method) {
    return {
      statusCode: 400,
      body: "Missing `path` or `method` param.",
    }
  }

  const response = await new Fetch({
    host: webtoken.shop,
    path: query.path,
    port: 443,
    method: query.method,
    headers: {
      "X-Shopify-Access-Token": webtoken.access_token
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
