import { Serverless } from "../../serverless";
import { Shopify } from "../../services";
import * as cookie from "cookie";
import * as uuid from "uuid";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  const query = request.queryStringParameters;
  const cookies = cookie.parse(String(request.headers.cookie));

  if(query.state !== cookies.secret) {
    return {
      statusCode: 403,
      body: "Unauthorized origin.",
    }
  }

  if(!query.shop || !query.hmac || !query.code) {
    return {
      statusCode: 400,
      body: "Missing `shop`, `hmac` or `code` param.",
    }
  }

  const token = await Shopify.getAccessToken(query.shop, query.code);

  const timestamp = new Date();
  timestamp.setTime(timestamp.getTime() + 60 * 1000);

  return {
    statusCode: 302,
    headers: {
      "Location": `https://${query.shop}/admin/apps/${process.env.SHOPIFY_APP_PATH}`,
      "Set-Cookie": cookie.serialize("token", token, { path: "/", expires: timestamp }),
    }
  }
}

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
