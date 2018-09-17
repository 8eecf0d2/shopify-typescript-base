import { Serverless } from "../../serverless";
import { Shopify, Webtoken } from "../../services";
import * as cookie from "cookie";
import * as uuid from "uuid";

export const shopifyCallbackHandler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  const query = request.queryStringParameters;
  const cookies = cookie.parse(String(request.headers.cookie));
  const webtoken = Webtoken.verify(cookies.webtoken);

  if(!webtoken) {
    throw {
      statusCode: 403,
      body: "Invalid webtoken.",
    }
  }

  if(query.state !== webtoken.secret) {
    throw {
      statusCode: 403,
      body: "Unauthorized origin.",
    }
  }

  if(!query.shop || !query.hmac || !query.code) {
    throw {
      statusCode: 400,
      body: "Missing `shop`, `hmac` or `code` param.",
    }
  }

  const access_token = await Shopify.getAccessToken(query.shop, query.code);

  const timestamp = new Date();
  timestamp.setTime(timestamp.getTime() + 365 * 24 * 60 * 60 * 1000);

  return {
    statusCode: 302,
    headers: {
      "Location": `https://${query.shop}/admin/apps/${process.env.SHOPIFY_APP_PATH}`,
      "Set-Cookie": cookie.serialize("webtoken", Webtoken.sign({ ...webtoken, access_token: access_token }), { path: "/", expires: timestamp }),
    }
  }
}

export const handler = Serverless.handle(Webtoken.middleware, shopifyCallbackHandler);

export namespace handler {
  export interface Request extends Serverless.Handler.Request {
    queryStringParameters: {
      shop: string;
      state: string;
      hmac: string;
      code: string;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    headers?: {
      Location?: string;
      "Set-Cookie"?: string;
    };
  }
}
