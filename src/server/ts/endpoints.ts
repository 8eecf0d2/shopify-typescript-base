import { WebServer } from "./web-server";
import { Handler, Handlers } from "./handlers";

const ApiHandlerProxy = (handler: Handler): WebServer.Route.Handler => {
  return async (request, response) => {
    const payload = {
      params: request.body(),
      user: '',
    }
    let handlerResponse;
    try {
      handlerResponse = await handler(payload);
    } catch(error) {
      return response.status(error.code || 500).json(error.message);
    }
    response.status(handlerResponse.code || 200).json(handlerResponse.data);
  }
}

export const endpoints: WebServer.Route.Options[] = [{
  method: 'post',
  path: '/api/database/find/log',
  handler: ApiHandlerProxy(Handlers.Database.FindLog)
}]
