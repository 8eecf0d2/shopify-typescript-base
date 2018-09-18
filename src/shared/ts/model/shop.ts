import * as dynamoose from "dynamoose";

const ShopDynamoSchema = new dynamoose.Schema({
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

export const ShopModel = dynamoose.model("shop", ShopDynamoSchema);
