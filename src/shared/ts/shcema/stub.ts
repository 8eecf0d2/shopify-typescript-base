export class Stub implements Stub.Object {
  public id: string;
  public type: Stub.Type;

  constructor(
    public raw: Stub.Object,
  ) {
    Object.assign(this, raw);
  }

  public toObject(): Stub.Object {
    return {
      id: this.id,
      type: this.type,
    }
  }

  static empty(): Stub {
    return new Stub({
      id: "",
      type: "info"
    })
  }
}


export namespace Stub {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    type: Stub.Type;
  }
}
