import { Fetch } from "../../../shared/ts/fetch";
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

export interface DatabaseFindRequest<SchemaType = string> extends Handler.Request {
  schema: SchemaType;
}
export interface DatabaseFindResponse extends Handler.Response {
  items: any[];
}
