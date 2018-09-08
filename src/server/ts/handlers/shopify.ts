import { Fetch } from "../util";
import { Handler } from "./";

export const ShopRoute: Handler<ShopifyShopRequest, ShopifyShopResponse> = async (context) => {
  const shopData = await new Fetch({
    host: context.session.cookies.shop,
    path: "/admin/shop.json",
    port: 443,
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": context.session.cookies.token
    }
  }).exec();

  return {
    ...context,
    code: 200,
    response: shopData
  };
}

export interface ShopifyShopRequest extends Handler.Request {}
export interface ShopifyShopResponse extends Handler.Response {}

export const GenericRoute: Handler<ShopifyGenericRequest, ShopifyGenericResponse> = async (context) => {
  const shopData = await new Fetch({
    host: context.session.cookies.shop,
    path: context.request.path,
    port: 443,
    method: context.request.method,
    headers: {
      "X-Shopify-Access-Token": context.session.cookies.token
    }
  }).exec(context.request.payload || false);

  return {
    ...context,
    code: 200,
    response: shopData
  };
}

export interface ShopifyGenericRequest extends Handler.Request {
  path: string;
  method: string;
  payload?: any;
}
export interface ShopifyGenericResponse extends Handler.Response {}
