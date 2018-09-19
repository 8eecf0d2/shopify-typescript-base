import { Webtoken } from "./services/webtoken";

/** TODO: Breakout class into helper package */
export class Serverless {
  public static handle (...handlers: Serverless.Handler[]): Serverless.Handler {
    return async (request, context, callback) => {
      const emptyHeaders: Serverless.Handler.Headers = {};
      request = {
        ...request,
        body: typeof request.body === "string" ? JSON.parse(request.body) : request.body,
        headers: {
          ...Object.keys(request.headers).reduce((headers, header) => {
            headers[header.toLowerCase()] = request.headers[header];

            return headers;
          }, emptyHeaders),
        },
        query: {
          ...request.queryStringParameters,
          ...request.query,
        }
      };

      let response;

      for (const handler of handlers) {
        try {
          response = await handler(request, context, callback);
        } catch (error) {
          if (error.body) {
            error.body = JSON.stringify(error.body);
          }
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          return error;
        }
      }
      if (response.body) {
        response.body = JSON.stringify(response.body);
      }

      return response;
    };
  }
}

export namespace Serverless {
  export namespace Handler {
    export type Headers = { [key: string]: string };
    export interface Request<Body = {}, Query = {}> {
      body: Body;
      query: Query;
      queryStringParameters: Query;
      method: "GET" | "POST";
      headers: Serverless.Handler.Headers;
      webtoken?: Webtoken.Payload;
    }
    export interface Context {}
    export interface Response<Body = {}> {
      statusCode: number;
      body?: Body;
      headers?: Serverless.Handler.Headers;
    }
  }
  export type Handler<Request = Serverless.Handler.Request, Response = Serverless.Handler.Response> = (
    request: Request,
    context: Serverless.Handler.Context,
    callback: (error: boolean, response: Response) => void,
  ) => Promise<Response> | Response;
}
