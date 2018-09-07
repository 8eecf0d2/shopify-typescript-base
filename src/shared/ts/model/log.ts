export class LogModel implements LogModel.Object {
  public id: string;
  public type: LogModel.Type;
  public source: string;
  public message: string;
  public data: any;
  public ts: number;

  constructor(
    public raw: LogModel.Object,
  ) {
    Object.assign(this, raw);
  }

  public toObject(): LogModel.Object {
    return {
      id: this.id,
      type: this.type,
      source: this.source,
      message: this.message,
      data: this.data,
      ts: this.ts,
    }
  }

  static empty(): LogModel {
    return new LogModel({
      id: "",
      type: "info",
      source: "",
      message: "",
      data: {},
      ts: 0,
    })
  }
}

export namespace LogModel {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    type: LogModel.Type;
    source: string;
    message: string;
    data: any;
    ts: number;
  }
}
