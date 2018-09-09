export class LogSchema {
  static empty (): LogSchema.Object {
    return {
      id: "",
      type: "info",
      source: "",
      message: "",
      data: {},
      createdAt: 0,
    };
  }
}

export namespace LogSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    type: LogSchema.Type;
    source: string;
    message: string;
    data: any;
    createdAt: number;
  }

}
