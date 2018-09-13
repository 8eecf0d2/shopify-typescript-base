import { Serverless } from "../../serverless";
import { Shopify } from "../../services";
import * as cookie from "cookie";
import * as uuid from "uuid";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context) => {
  const query = request.queryStringParameters;
  const cookies = cookie.parse(request.headers.Cookie);

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

  const accessToken = await Shopify.getAccessToken(query.shop, query.code);

  // TODO: Save access token

  return {
    statusCode: 302,
    headers: {
      "Location": `https://${query.shop}/admin/apps/${process.env.SHOPIFY_APP_PATH}`,
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
