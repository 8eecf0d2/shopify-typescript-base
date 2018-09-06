import * as Database from "./database";

export const Handlers = {
  Database,
}

export namespace Handler {
  export interface Request<RequestParams = any> {
    params: RequestParams;
    user: string;
  }
  export interface Response<ResponseData = any> {
    data: ResponseData;
    code?: any;
  }
}

export type Handler<RequestType = Handler.Request, ResponseType = Handler.Response> = (request: Handler.Request<RequestType>) => Promise<ResponseType>;
