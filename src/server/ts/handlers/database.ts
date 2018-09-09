import { LogSchema } from "../../../shared/ts/shcema";
import { invoiceTemplate, packingSlipTemplate } from "../../../shared/ts/stub/templates";
import { Handler } from "./";

export const Find: Handler<DatabaseFindRequest, DatabaseFindResponse> = async (context) => {

  let items: LogSchema[] = [];
  switch(context.request.model) {
    case "log":
      items = FindLogs(context);
      break;
    case "template":
      items = FindTemplates(context);
      break;
    default:
      throw new Handler.Error(`Model "${context.request.model}" is invalid.`, 400)
  }

  return {
    ...context,
    code: 200,
    response: {
      items: items
    },
  };
}

export const FindLogs = (context: Handler.Context): LogSchema[] => {
  return [
    { id: "0", type: "warning", source: "server", message: "Foo bad", data: {}, createdAt: new Date('2018-08-11').getTime() },
    { id: "1", type: "info", source: "server", message: "Foo ok", data: {}, createdAt: new Date('2018-08-11').getTime() },
    { id: "2", type: "success", source: "server", message: "Foo good", data: {}, createdAt: new Date('2018-08-08').getTime() },
    { id: "3", type: "info", source: "server", message: "Foo ok", data: {}, createdAt: new Date('2018-08-11').getTime() },
  ]
}

export const FindTemplates = (context: Handler.Context): LogSchema[] => {
  return [
    { id: "0", title: "Invoice Template", shopId: "*", content: invoiceTemplate, default: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "1", title: "Packing Slip Template", shopId: "*", content: packingSlipTemplate, default: true, createdAt: new Date(), updatedAt: new Date() }
  ]
}

export interface DatabaseFindRequest<ModelValue = string> extends Handler.Request {
  model: ModelValue;
}
export interface DatabaseFindResponse extends Handler.Response {
  items: LogSchema[];
}
