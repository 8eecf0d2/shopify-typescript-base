import * as jsonwebtoken from "jsonwebtoken";

export class Webtoken {
  public static sign (payload: Webtoken.Payload): string {
    return jsonwebtoken.sign(payload, process.env.API_SECRET);
  }
  public static verify (webtoken: string): Webtoken.Payload|false {
    let decoded: Webtoken.Payload;
    try {
      decoded = <Webtoken.Payload>jsonwebtoken.verify(webtoken, process.env.API_SECRET);
    } catch (error) {
      return false;
    }
    return decoded;
  }
}

export namespace Webtoken {
  export interface Payload {
    secret: string;
    shop: string;
    access_token?: string;
  }
}
