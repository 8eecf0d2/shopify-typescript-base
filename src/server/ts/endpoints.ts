import { WebServer } from "./web-server";
import { Handler, Handlers } from "./handlers";

const ApiHandlerProxy = (handlers: Handler[]): WebServer.Route.Handler => {
  return async (request, response) => {

    let context: Handler.Context = {
      request: request.body,
      response: null,
      session: {
        authenticated: false,
      },
    }

    for(const handler of handlers) {
      try {
        context = await handler(context) as any;
      } catch(error) {
        return response.status(error.code || 500).json(error.message);
      }
    }
    // @ts-ignore
    response.status(context.code || 200).json(context.data);
  }
}

const ApiSessionCheck: Handler = (context) => {
  return Promise.resolve({
    ...context
  })
}

export const endpoints: WebServer.Route.Options[] = [{
  method: 'get',
  path: '/api/database/find/log',
  handler: ApiHandlerProxy([ApiSessionCheck, Handlers.Database.FindLog])
}]
