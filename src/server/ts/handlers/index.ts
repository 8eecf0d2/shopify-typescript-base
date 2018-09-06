import * as Database from "./database";

export const Handlers = {
  Database,
}

export const Handler = {
  Error: class HandlerError extends Error {
    constructor(
      public message: string,
      public code: number,
    ) { super(message) }
  },
}

export namespace Handler {
  export interface Session {
    id?: string;
    type?: 'oauth'|'password'|'header';
    authenticated: boolean;
  }
  export interface Context<Request = Handler.Request, Response = Handler.Response> {
    request: Request;
    response: Response;
    code: number;
    session: Handler.Session;
  }
  export interface Request {}
  export interface Response {}
}

export type Handler<Request = Handler.Request, Response = Handler.Response> = (request: Handler.Context<Request, Response>) => Promise<Handler.Context<Request, Response>>;
