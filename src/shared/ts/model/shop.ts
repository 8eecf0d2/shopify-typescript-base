
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

  public static empty (): ShopInterface {
    return {
      id: "",
      domain: "",
      accessToken: "",
      createdAt: 0,
      updatedAt: 0,
    };
  }

  public static async query (search: any, attributes?: any): Promise<ShopInterface[]> {
    //@ts-ignore
    const result: ShopInterface[] = await ShopModel.model.scan(search).attributes(attributes).all().exec();

    return result;
  }

  public static async save (shop: ShopInterface): Promise<Boolean> {
    const exists = (await ShopModel.query({ domain: { eq: shop.domain } }))[0];

    if(exists) {
      return ShopModel.create(shop);
    } else {
      return ShopModel.update(shop);
    }
  }

  public static async create (shop: ShopInterface): Promise<Boolean> {
    try {
      await ShopModel.model.create(shop);
    } catch (error) {
      throw error;
    }

    return true;
  }

  public static async update (shop: ShopInterface): Promise<Boolean> {
    try {
      await ShopModel.model.update({ id: shop.id }, shop);
    } catch (error) {
      throw error;
    }

    return true;
  }

  public static async remove (id: string): Promise<boolean> {
    return true;
  }
}

export interface ShopInterface {
  id: string;
  domain: string;
  accessToken: string;
  createdAt?: number;
  updatedAt?: number;
}
