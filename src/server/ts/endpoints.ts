import { WebServer } from "../../shared/ts/web-server";
import { Handler, Handlers } from "./handlers";

import * as cookie from "cookie";

const ApiHandlerProxy = (handlers: Handler[]): WebServer.Route.Handler => {
  return async (request, response) => {
    let context: Handler.Context = {
      request: {
        ...request.params,
        ...request.query,
        ...request.body
      },
      code: 200,
      response: null,
      session: {
        authenticated: false,
        /** TODO: Parse incomming Cookies */
        cookies: cookie.parse(String(request.headers.cookie))
      },
    }

    for(const handler of handlers) {
      try {
        context = await handler(context);
      } catch(error) {
        console.error(`[web-server]: error:${error.code || 500}:${request.url}\n`, error)
        return response.status(error.code || 500).json(error.response || "An internal error occured");
      }
    }

    if(context.session.cookies) {
      for(const cookie in context.session.cookies) {
        /** TODO: Set outgoing Cookies */
        response.cookie(cookie, context.session.cookies[cookie]);
      }
    }

    if(context.redirect) {
      return response.redirect(context.redirect)
    }

    return response.status(context.code || 200).json(context.response);
  }
}

const ApiSessionCheck: Handler = (context) => {
  return Promise.resolve({
    ...context,
    session: {
      ...context.session,
      authenticated: true,
    }
  })
}

export const endpoints: WebServer.Route.Options[] = [{
  /** ShopifyAuth */
  method: "get",
  path: "/shopify/install",
  handler: ApiHandlerProxy([Handlers.ShopifyAuth.InstallRoute])
},{
  /** ShopifyAuth */
  method: "get",
  path: "/shopify/callback",
  handler: ApiHandlerProxy([Handlers.ShopifyAuth.CallbackRoute])
},{
  /** ShopifyAuth */
  method: "post",
  path: "/api/shopify/proxy",
  handler: ApiHandlerProxy([Handlers.ShopifyProxy.ProxyRoute])
},{
  /** Database */
  method: "post",
  path: "/api/database/find",
  handler: ApiHandlerProxy([ApiSessionCheck, Handlers.Database.Find])
},]
