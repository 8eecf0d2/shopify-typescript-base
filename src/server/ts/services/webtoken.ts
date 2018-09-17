import { Serverless } from "../serverless";
import * as jsonwebtoken from "jsonwebtoken";
import * as cookie from "cookie";

export class Webtoken {
  public static sign (payload: Webtoken.Payload): string {
    return jsonwebtoken.sign(payload, process.env.API_SECRET);
  }
  public static verify (webtoken: string): Webtoken.Payload {
    let decoded: Webtoken.Payload;
    try {
      decoded = <Webtoken.Payload>jsonwebtoken.verify(webtoken, process.env.API_SECRET);
    } catch (error) {
      throw error;
    }
    return decoded;
  }

  public static middleware: Serverless.Handler<Webtoken.Middleware.Request, Webtoken.Middleware.Response> = async (request, context, callback) => {
    const cookies = cookie.parse(String(request.headers.cookie));
    let webtoken: Webtoken.Payload;
    try {
      webtoken = Webtoken.verify(request.query.webtoken || cookies.webtoken);
    } catch (error) {
      throw {
        body: "Error: invalid `webtoken`.",
        statusCode: 403,
      };
    }

    if(!webtoken.access_token) {
      throw {
        // TODO: redirect to install page
        statusCode: 403,
        body: "Missing Shopify access token.",
      }
    }

    return {
      statusCode: 200,
    };
  }
}

export namespace Webtoken {
  export interface Payload {
    secret: string;
    shop: string;
    access_token?: string;
  }
  export namespace Middleware {
    export interface Request extends Serverless.Handler.Request {
      query: {
        webtoken: string;
      };
      headers: {
        cookie?: string;
      };
    }
    export interface Response extends Serverless.Handler.Response {}
  }
}
