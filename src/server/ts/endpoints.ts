import { WebServer } from "./web-server";
import { Handler, Handlers } from "./handlers";

const ApiHandlerProxy = (handlers: Handler[]): WebServer.Route.Handler => {
  return async (request, response) => {

    let context: Handler.Context = {
      request: request.body,
      code: 200,
      response: null,
      session: {
        authenticated: false,
      },
    }

    for(const handler of handlers) {
      try {
        context = await handler(context) as any;
      } catch(error) {
        return response.status(error.code || 500).json(error.response);
      }
    }

    response.status(context.code || 200).json(context.response);
  }
}

const ApiSessionCheck: Handler = (context) => {
  return Promise.resolve({
    ...context,
    session: {
      authenticated: true
    }
  })
}

export const endpoints: WebServer.Route.Options[] = [{
  method: "post",
  path: "/api/database/find/log",
  handler: ApiHandlerProxy([ApiSessionCheck, Handlers.Database.FindLog])
}]
