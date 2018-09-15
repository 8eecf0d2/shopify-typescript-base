export namespace Serverless {
  export namespace Handler {
    export interface Request<Body = {}, Query = {}> {
      body: Body;
      query: Query;
      method: "GET"|"POST";
      headers: { [key: string]: string };
    }
    export interface Context {}
    export interface Response<Body = {}> {
      statusCode: number;
      body?: Body;
      headers?: { [key: string]: string };
    }
  }
  export type Handler<Request = Serverless.Handler.Request, Response = Serverless.Handler.Response> = (
    request: Request,
    context: Serverless.Handler.Context,
    callback: (error: boolean, response: Response) => void
  ) => Promise<Response>|Response|void;
}
