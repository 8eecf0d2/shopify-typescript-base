import { Serverless } from "../serverless";

export const hola: Serverless.Handler<hola.Request, hola.Response> = async (request, context, callback) => {
  return {
    statusCode: 200,
    body: `hola, ${request.query.name ? request.query.name : "stranger"} 👋`,
  }
}

export namespace hola {
  export interface Request extends Serverless.Handler.Request {
    query: {
      name: string;
    };
  }
  export interface Response extends Serverless.Handler.Response {
    body: string;
  }
}
