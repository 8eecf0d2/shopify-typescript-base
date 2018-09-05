export class SyncModel {
  public id: string;
  public name: string;
  public purpose: string;
  public endpoint: string;
  public frequency: number;
  public mappings: SyncModel.Mapping[];

  constructor(
    private raw: SyncModel,
  ) {
    Object.assign(this, raw);
  }

  /**
   *  Converts a Product from Shopify format to Provided Mapping.
   */
  public convert(input: any) {
    const payload = this.mappings.reduce((output: any, mapping) => {
      output[mapping.external] = input[mapping.internal];

      return output
    }, {});

    return payload;
  }
}

export namespace SyncModel {
  export namespace Mapping {
    export type external = string;
    export type internal = 'title'|'price'|'currency'|'description'|'images'|string;
  }
  export interface Mapping {
    external: SyncModel.Mapping.external;
    internal: SyncModel.Mapping.internal;
  }
}

export const ShopifyProductInterface = {
  title: String,
  price: Number,
  currency: String,
  description: String,
  images: [String],
}
