import * as crypto from "crypto";
import * as uuid from "uuid";

import { Fetch } from "../../../shared/ts/fetch";
import { Handler } from "./";

export const ShopifySetupRoute: Handler<ShopifySetupRequest, ShopifySetupResponse> = async (context) => {
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

export interface ShopifySetupRequest extends Handler.Request {
  shop: string;
}
export interface ShopifySetupResponse extends Handler.Response {}

export const ShopifyCallbackRoute: Handler<ShopifyCallbackRequest, ShopifyCallbackResponse> = async (context) => {
  if(context.request.state !== context.session.cookies.secret) {
    throw new Handler.Error("Unauthorizaed Origin.", 403);
  }

  if(!context.request.shop || !context.request.hmac || !context.request.code) {
    throw new Handler.Error("Missing `shop`, `hmac` or `code` param.", 400);
  }

  /** TODO: Validate request with crypto */

  context.session.cookies.shop = context.request.shop;
  context.session.cookies.token = await getShopifyAccessToken(context.request.shop, context.request.code);

  /** TODO: Create shop in database */

  const shopExists = await new Fetch({
    host: process.env.DATABASE_ADDRESS,
    path: "/find",
    port: process.env.DATABASE_HTTPS_PORT,
    method: "POST"
  }).exec({
    schema: "shops",
    shop: context.request.shop,
  });

  const oldShopData = shopExists.items[0];

  let shopData = {
    id: oldShopData ? oldShopData.id : undefined,
    domain: context.request.shop,
    accessToken: context.session.cookies.token
  };

  const saveShop = await new Fetch({
    host: process.env.DATABASE_ADDRESS,
    path: "/save",
    port: process.env.DATABASE_HTTPS_PORT,
    method: "POST"
  }).exec({
    data: shopData,
    schema: "shops",
    shop: context.request.shop,
  });

  return {
    ...context,
    code: 200,
    redirect: "/shopify/orders"
  };
}

export interface ShopifyCallbackRequest extends Handler.Request {
  shop: string;
  hmac: string;
  code: string;
  state: string;
}
export interface ShopifyCallbackResponse extends Handler.Response {}

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
