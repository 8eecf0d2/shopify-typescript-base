import { Fetch } from "../../../shared/ts/fetch";

export class Shopify {
  static async getAccessToken (shop: string, code: string): Promise<string> {
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

    return request.access_token;
  }
}
