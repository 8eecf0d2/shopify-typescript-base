import { Serverless } from "../../serverless";
import * as cookie from "cookie";
import * as uuid from "uuid";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  const query = request.queryStringParameters;

  if(!query.shop) {
    return {
      statusCode: 200,
      body: "Missing `shop` param.",
    }
  }

  const secret = uuid.v4();
  const callback = `https://${process.env.API_ADDRESS}:${process.env.API_HTTPS_PORT}/api/shopify/callback`;
  const redirect = `https://${query.shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPE}&state=${secret}&redirect_uri=${callback}`;

  return {
    statusCode: 302,
    headers: {
      "Location": redirect,
      "Set-Cookie": cookie.serialize("secret", secret),
    },
  }
}

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    queryStringParameters: {
      shop: string;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    headers?: {
      "Location": string;
      "Set-Cookie": string;
    };
  }
}
