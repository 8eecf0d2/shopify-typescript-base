import { WebServer } from "../../shared/ts/web-server";
import { Handler, ShopifySetupRoute, ShopifyCallbackRoute, ShopifyProxyRoute, ShopifySessionCheck, DatabaseFindRoute, DatabaseSaveRoute } from "./handlers";

import * as cookie from "cookie";

const EndpointWrapper = (handlers: Handler[]): WebServer.Route.Handler => {
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

export const endpoints: WebServer.Route.Options[] = [{
  /** Shopify Auth */
  method: "get",
  path: "/shopify/setup",
  handler: EndpointWrapper([ShopifySetupRoute])
},{
  method: "get",
  path: "/shopify/callback",
  handler: EndpointWrapper([ShopifyCallbackRoute])
},{
  /** Shopify Proxy */
  method: "post",
  path: "/api/shopify/proxy",
  handler: EndpointWrapper([ShopifyProxyRoute])
},{
  /** Database */
  method: "post",
  path: "/api/database/find",
  handler: EndpointWrapper([ShopifySessionCheck, DatabaseFindRoute])
},{
  /** Database */
  method: "post",
  path: "/api/database/save",
  handler: EndpointWrapper([ShopifySessionCheck, DatabaseSaveRoute])
},]
