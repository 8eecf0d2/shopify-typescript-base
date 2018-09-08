import * as crypto from "crypto";
import * as uuid from "uuid";

import { Fetch } from "../util";
import { Handler } from "./";

export const InstallRoute: Handler<ShopifyAuthInstallRequest, ShopifyAuthInstallResponse> = async (context) => {
  if(!context.request.shop) {
    throw new Handler.Error("Missing `shop` param.", 400);
  }

  const secret = uuid.v4();
  const callback = `https://${process.env.SHOPIFY_APP_DOMAIN}/shopify/callback`;
  const redirect = `https://${context.request.shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPE}&state=${secret}&redirect_uri=${callback}`;

  context.session.cookies.secret = secret;

  return {
    ...context,
    code: 200,
    redirect: redirect,
  };
}

export interface ShopifyAuthInstallRequest extends Handler.Request {
  shop: string;
}
export interface ShopifyAuthInstallResponse extends Handler.Response {}

export const CallbackRoute: Handler<ShopifyAuthCallbackRequest, ShopifyAuthCallbackResponse> = async (context) => {
  if(context.request.state !== context.session.cookies.secret) {
    throw new Handler.Error("Unauthorizaed Origin.", 403);
  }

  if(!context.request.shop || !context.request.hmac || !context.request.code) {
    throw new Handler.Error("Missing `shop`, `hmac` or `code` param.", 400);
  }

  /** TODO: Validate request with crypto */

  context.session.cookies.shop = context.request.shop;
  context.session.cookies.token = await getShopifyAccessToken(context.request.shop, context.request.code);

  return {
    ...context,
    code: 200,
    redirect: "/shopify"
  };
}

export interface ShopifyAuthCallbackRequest extends Handler.Request {
  shop: string;
  hmac: string;
  code: string;
  state: string;
}
export interface ShopifyAuthCallbackResponse extends Handler.Response {}

const getShopifyAccessToken = async (shop: string, code: string) => {
  const accessTokenPayload = {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code: code,
  };

  const request = await new Fetch({
    host: shop,
    path: "/admin/oauth/access_token",
    port: 443,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  }).exec(accessTokenPayload);

  console.log(`[shopify]: access-token=${request.access_token}`);

  return request.access_token;
}

