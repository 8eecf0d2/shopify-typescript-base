import * as crypto from "crypto";
import * as querystring from "querystring";
import { WebServer } from "../../shared/ts/web-server";

export const CheckShopifyAuth: WebServer.Route.Handler = (request, response, next) => {
  /** TODO: Verify request once Shopify update their damn docs.. */
  next();
}
