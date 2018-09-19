export class LineItemModel {
  static empty (): LineItemInterface {
    return {
      id: ""
    };
  }
}

export interface LineItemInterface {
  id: string;
}
