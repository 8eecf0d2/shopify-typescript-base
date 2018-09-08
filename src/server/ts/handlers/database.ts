import { LogModel } from "../../../shared/ts/model";
import { Handler } from "./";

export const FindLogRoute: Handler<DatabaseFindLogRequest, DatabaseFindLogResponse> = async (context) => {

  // if(1 === 1) {
  //   throw new Handler.Error({ foo: "bar" }, 500);
  // }

  const items: LogModel[] = [
    new LogModel({ id: "0", type: "warning", source: "server", message: "Foo bad", data: {}, ts: new Date('2018-08-11').getTime() }),
    new LogModel({ id: "1", type: "info", source: "server", message: "Foo ok", data: {}, ts: new Date('2018-08-11').getTime() }),
    new LogModel({ id: "2", type: "success", source: "server", message: "Foo good", data: {}, ts: new Date('2018-08-08').getTime() }),
    new LogModel({ id: "3", type: "info", source: "server", message: "Foo ok", data: {}, ts: new Date('2018-08-11').getTime() }),
  ]

  return {
    ...context,
    code: 200,
    response: {
      items: items
    },
  };
}

export interface DatabaseFindLogRequest extends Handler.Request {
  foo: string;
}
export interface DatabaseFindLogResponse extends Handler.Response {
  items: LogModel[];
}
