import * as https from "https";
import * as querystring from "querystring";

export class Fetch<Payload = any> {
  constructor(
    public options: https.RequestOptions
  ) {}

  public async exec (payload?: Payload): Promise<any> {
    return new Promise((resolve, reject) => {
      let payloadStr: string;
      if(payload) {
        payloadStr = JSON.stringify(payload);
        this.options.headers = {
          ...this.options.headers,
          "Content-Length": payloadStr.length
        }
      }

      const request = https.request(this.options, (response) => {
        let data = "";
        response.setEncoding("utf8");
        response.on("data", (body) => data += body);
        response.on("end", () => {
          try {
            data = JSON.parse(data);
          } catch(error) {
            reject(data);
          }
          return resolve(data);
        });
      });
      if(payload) {
        request.write(payloadStr);
      }
      request.end();
    });
  }
}
