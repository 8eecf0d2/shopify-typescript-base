export class LineItemSchema {
  static empty (): LineItemSchema.Object {
    return {
      id: ""
    };
  }
}

export namespace LineItemSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
  }
}
