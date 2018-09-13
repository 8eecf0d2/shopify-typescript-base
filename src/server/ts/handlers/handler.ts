export const Handler = {
  Error: class HandlerError extends Error {
    constructor(
      public response: string|any,
      public code: number,
    ) { super(response) }
  },
}

export namespace Handler {
  export interface Session {
    id?: string;
    type?: "oauth"|"password"|"header";
    authenticated: boolean;
    cookies: { [ key: string ]: string };
  }
  export interface Context<Request = Handler.Request, Response = Handler.Response> {
    request: Request;
    response: Response;
    code: number;
    session: Handler.Session;
    redirect?: string;
  }
  export interface Request {}
  export interface Response {}
}

export type Handler<Request = Handler.Request, Response = Handler.Response> = (request: Handler.Context<Request, Response>) => Promise<Handler.Context<Request, Response>>;
