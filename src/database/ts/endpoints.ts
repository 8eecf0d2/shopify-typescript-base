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

    let result: boolean;

    switch(query.schema) {
      case "shops":
        result = SaveShop(query);
        break;
      case "templates":
        result = SaveTemplate(query);
        break;
    }

    return result ? response.status(200).json({}) :  response.status(500).json("Unable to save item.");
  }]
}]

export const SaveTemplate = (query: SaveQuery) => {
  return !query.data.id ? CreateTemplate(query) : UpdateTemplate(query);
}

export const CreateTemplate = (query: SaveQuery): boolean => {
  const ts = new Date().getTime();
  database.get("templates")
    .push({
      id: uuid.v4(),
      title: query.data.title,
      contnet: query.data.content,
      shop: query.data.shop,
      default: query.data.default,
      createdAt: ts,
      updatedAt: ts,
    })
    .write();

  return true;
}

export const UpdateTemplate = (query: SaveQuery): boolean => {
  const exist = database.get("templates")
    .find({ id: query.data.id, shop: query.data.shop })
    .value()

  if(!exist) {
    return false
  }

  database.get("templates")
    .find({ id: query.data.id, shop: query.data.shop })
    .assign({
      title: query.data.title,
      content: query.data.content,
      default: query.data.default,
      updatedAt: new Date().getTime(),
    })
    .write();

  return true;
}

export const SaveShop = (query: SaveQuery): boolean => {
  return !query.data.id ? CreateShop(query) : UpdateShop(query);
}

export const CreateShop = (query: SaveQuery): boolean => {
  const ts = new Date().getTime();
  const shop: ShopSchema.Object = {
    id: uuid.v4(),
    domain: query.data.shop,
    accessToken: query.data.accessToken,
    createdAt: ts,
    updatedAt: ts,
  }

  database.get("shops")
    .push(shop)
    .write();

  const defaultTemplates = database.get("default_templates")
    .filter({ shop: "*" })
    .value()
    .map(template => ({ ...template, shop: shop.id }));

  database.get("templates")
    .push(defaultTemplates)
    .write();

  return true;
}

export const UpdateShop = (query: SaveQuery): boolean => {
  const exist = database.get("shops")
    .find({ id: query.data.id })
    .value()

  if(!exist) {
    return false
  }

  database.get("shops")
    .find({ id: query.data.id, shop: query.data.shop })
    .assign({
      domain: query.data.domain,
      accessToken: query.data.accessToken,
      updatedAt: new Date().getTime(),
    })
    .write();
}

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
  } & any;
}
