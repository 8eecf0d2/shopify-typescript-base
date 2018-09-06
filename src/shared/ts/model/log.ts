export class LogModel {
  public id: string;
  public type: LogModel.Type;
  public source: string;
  public message: string;

  constructor(
    private raw: LogModel,
  ) {
    Object.assign(this, raw);
  }
}

export namespace LogModel {
  export type Type = 'info'|'success'|'error';
}
