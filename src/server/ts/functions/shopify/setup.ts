import { Serverless } from "../../serverless";
import { Webtoken } from "../../services";
import * as cookie from "cookie";
import * as uuid from "uuid";

export const shopifySetupHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  const query = request.queryStringParameters;

  if(!query.shop) {
    throw {
      statusCode: 200,
      body: "Missing `shop` param.",
    }
  }

  const secret = uuid.v4();
  const webtoken = Webtoken.sign({ secret: secret, shop: query.shop })
  const callback = `${process.env.API_PROTOCOL}://${process.env.API_ADDRESS}:${process.env.API_PORT}/api/shopify/callback`;
  const redirect = `https://${query.shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPE}&state=${secret}&redirect_uri=${callback}`;

  const timestamp = new Date();
  timestamp.setTime(timestamp.getTime() + 60 * 1000);

  return {
    statusCode: 302,
    headers: {
      "Location": redirect,
      "Set-Cookie": cookie.serialize("webtoken", webtoken, { path: "/", expires: timestamp }),
    },
  }
}

export const handler = Serverless.handle(shopifySetupHandler);

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
