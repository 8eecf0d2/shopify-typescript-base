import { ShopSchema } from "../shcema";
import * as dynamoose from "dynamoose";

export class ShopModel {
  public static schema = new dynamoose.Schema({
    id: {
      type: String,
      validate: (v: string) => v.length === 36,
      hashKey: true,
    },
    domain: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },{
    timestamps: true,
  });

  public static model = dynamoose.model("shop", ShopModel.schema);

  public static async query (search: any, attributes?: any): Promise<ShopSchema[]> {
    const result = await ShopModel.model.scan(search).attributes(attributes).all().exec();

    return result;
  }

  public static async save (shop: ShopSchema.Object): Promise<ShopSchema> {
    const exists = (await ShopModel.query({ domain: { eq: shop.domain } }))[0];

    if(exists) {
      return ShopModel.create(shop);
    } else {
      return ShopModel.update(shop);
    }
  }

  public static async create (shop: ShopSchema.Object): Promise<ShopSchema> {
    const result = await ShopModel.model.create(shop);

    return result;
  }

  public static async update (shop: ShopSchema.Object): Promise<ShopSchema> {
    const result = await ShopModel.model.update({ id: shop.id }, shop);

    return result;
  }

  public static async remove (id: string): Promise<boolean> {
    return true;
  }
}
