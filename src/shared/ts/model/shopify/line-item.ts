export class LineItemModel {}


export interface LineItemInterface {
  id: string;
}

export const emptyLineItemModel = (): LineItemInterface => {
  return {
    id: ""
  };
}
