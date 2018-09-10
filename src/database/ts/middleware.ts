import { WebServer } from "../../shared/ts/web-server";
import { ShopSchema } from "../../shared/ts/shcema";
import { database } from "./database";
import { DatabaseQuery } from "./endpoints";

const schemas = [ "shops", "logs", "templates" ];

export const CheckParams: WebServer.Route.Handler = (request, response, next) => {
    const query: DatabaseQuery = request.body;

    if(!query.schema || !query.shop) {
      return response.status(400).json({ error: `Missing params.`});
    }

    if(!schemas.includes(query.schema)) {
      return response.status(400).json({ error: `Schema "${query.schema}" is invalid.`});
    }

    next();
}

export const CheckShop: WebServer.Route.Handler = (request, response, next) => {
    const query: DatabaseQuery = request.body;

    const shop: ShopSchema = database.get("shops")
      .find({ domain: query.shop })
      .value();

    if(!shop) {
      return response.status(400).json({ error: `Shop "${query.shop}" is invalid.`});
    }

    request.body._shop = shop;

    next();
}
