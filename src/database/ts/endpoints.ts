import { WebServer } from "../../shared/ts/web-server";
import { invoiceTemplate, packingSlipTemplate } from "../../shared/ts/stub/templates";
import { ShopSchema } from "../../shared/ts/shcema";
import { database } from "./database";
import * as uuid from "uuid";

import { CheckParams, CheckShop } from "./middleware";

const schemas = [ "shops", "logs", "templates" ];

export const endpoints: WebServer.Route.Options[] = [{
  method: "post",
  path: "/find",
  handler: [CheckParams, CheckShop, (request, response) => {
    const query: FindQuery = request.body;
    const shop: ShopSchema.Object = query._shop;

    const search = query.search ? Object.assign({}, query.search, { shop: shop.id }) : { shop: shop.id };

    const result = database.get(query.schema)
      .filter(search)
      .value();

    return response.status(200).json({ items: result })
  }]
},{
  method: "post",
  path: "/save",
  handler: [CheckParams, CheckShop, (request, response) => {
    const query: SaveQuery = request.body;
    const shop: ShopSchema.Object = query._shop;

    const CreateItem = (schema: string, shop: string, item: any): any => {
      item = Object.assign({}, item, { id: uuid.v4(), shop: shop });
      database.get(schema)
        .push({
          ...item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .write();

      return true;
    }

    const UpdateItem = (schema: string, shop: string, item: any) => {
      const exist = database.get(schema)
        .find({ id: item.id, shop: shop })
        .value()

      if(!exist) {
        return false
      }

      database.get(schema)
        .find({ id: item.id, shop: shop })
        .assign({
          ...item,
          updatedAt: new Date(),
        })
        .write();

      return true;
    }

    const result = !query.data.id ? CreateItem(query.schema, query._shop.id, query.data) : UpdateItem(query.schema, query._shop.id, query.data);

    return result ? response.status(200).json({}) :  response.status(500).json("Unable to save item.");
  }]
}]

export interface DatabaseQuery {
  schema: "shops"|"logs"|"templates";
  shop: string;
  _shop: ShopSchema.Object;
}

export interface FindQuery extends DatabaseQuery {
  search?: any;
}

export interface SaveQuery extends DatabaseQuery {
  data: {
    id: string;
    shop: string;
  };
}
