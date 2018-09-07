import * as path from "path";
import * as crypto from "crypto";
import * as uuid from "uuid";
import * as querystring from "querystring";

import { Handler } from "./";

export const InstallRoute: Handler<ShopifyInstallRequest, ShopifyInstallResponse> = async (context) => {
  if(!context.request.shop) {
    throw new Handler.Error("Missing `shop` param.", 400);
  }

  const secret = uuid.v4();
  const callback = `https://${process.env.SHOPIFY_APP_DOMAIN}/shopify/callback`;
  const redirect = `https://${context.request.shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SHOPIFY_API_SCOPE}&state=${secret}&redirect_uri=${callback}`;

  context.session.cookies.state = secret;

  return {
    ...context,
    code: 200,
    redirect: redirect,
  };
}

export const CallbackRoute: Handler<ShopifyCallbackRequest, ShopifyCallbackResponse> = async (context) => {
  if(context.request.state !== context.session.cookies.state) {
    throw new Handler.Error("Unauthorizaed Origin.", 403);
  }

  if(!context.request.shop || !context.request.hmac || !context.request.code) {
    throw new Handler.Error("Missing `shop`, `hmac` or `code` param.", 400);
  }

  /** TODO: Validate request with crypto */

  /** TODO: Request Access Token */

  return {
    ...context,
    code: 200,
    response: {}
  };
}


export interface ShopifyInstallRequest extends Handler.Request {
  shop: string;
}

export interface ShopifyInstallResponse extends Handler.Response {}

export interface ShopifyCallbackRequest extends Handler.Request {
  shop: string;
  hmac: string;
  code: string;
  state: string;
}

export interface ShopifyCallbackResponse extends Handler.Response {}
