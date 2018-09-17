import { Serverless } from "../../serverless";
import { Webtoken, Database } from "../../services";
import * as cookie from "cookie";

export const handler: Serverless.Handler<handler.Request, handler.Response> = async (request, context, callback) => {
  const query = request.body;
  const cookies = cookie.parse(String(request.headers.cookie || request.headers.Cookie));
  const webtoken = Webtoken.verify(cookies.webtoken);

  if(!webtoken) {
    return {
      statusCode: 403,
      body: "Invalid webtoken.",
    }
  }

  if(!webtoken.access_token) {
    return {
      statusCode: 403,
      body: "Missing Shopify access token.",
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await Database.Find("templates", "", {})),
  }
}

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
