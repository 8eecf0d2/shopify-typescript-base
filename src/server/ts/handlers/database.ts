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
    search: context.request.query || undefined,
    schema: context.request.schema,
    shop: context.session.cookies.shop,
  });

  return {
    ...context,
    code: 200,
    response: {
      items: response.items,
    },
  };
}

export interface DatabaseFindRequest<SchemaType = string> extends Handler.Request {
  schema: SchemaType;
  query?: any
}
export interface DatabaseFindResponse extends Handler.Response {
  items: any[];
}

export const Save: Handler<DatabaseSaveRequest, DatabaseSaveResponse> = async (context) => {
  const response = await new Fetch({
    host: process.env.DATABASE_ADDRESS,
    path: "/save",
    port: process.env.DATABASE_HTTPS_PORT,
    method: "POST"
  }).exec({
    data: context.request.data,
    schema: context.request.schema,
    shop: context.session.cookies.shop,
  });

  return {
    ...context,
    code: 200,
    response: {
      item: response.item,
    },
  };
}

export interface DatabaseSaveRequest<SchemaType = string> extends Handler.Request {
  schema: SchemaType;
  data: any
}
export interface DatabaseSaveResponse extends Handler.Response {
  item: any;
}
