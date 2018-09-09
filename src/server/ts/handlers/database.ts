import { Fetch } from "../../../shared/ts/fetch";
import { LogSchema } from "../../../shared/ts/shcema";
import { invoiceTemplate, packingSlipTemplate } from "../../../shared/ts/stub/templates";
import { Handler } from "./";

export const Find: Handler<DatabaseFindRequest, DatabaseFindResponse> = async (context) => {
  const response = await new Fetch({
    host: process.env.DATABASE_ADDRESS,
    path: "/find",
    port: process.env.DATABASE_HTTPS_PORT,
    method: "POST"
  }).exec({
    schema: context.request.schema,
    shop: context.session.cookies.shop
  });

  return {
    ...context,
    code: 200,
    response: {
      items: response.items
    },
  };
}

export interface DatabaseFindRequest<ModelValue = string> extends Handler.Request {
  model: ModelValue;
}
export interface DatabaseFindResponse extends Handler.Response {
  items: LogSchema[];
}
