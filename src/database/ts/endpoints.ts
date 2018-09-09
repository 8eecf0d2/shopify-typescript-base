import { WebServer } from "../../shared/ts/web-server";
import { invoiceTemplate, packingSlipTemplate } from "../../shared/ts/stub/templates";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("database.json");
const database = lowdb(adapter);

database.defaults({ shops: [], logs: [], templates: [], default_templates: [] }).write();

const schemas = [ "shops", "logs", "templates", "default_templates" ];

export const endpoints: WebServer.Route.Options[] = [{
  method: "post",
  path: "/find",
  handler: (request, response) => {
    const query: FindQuery = request.body;

    if(!query.schema || !query.shop) {
      return response.status(400).json({ error: `Missing params.`});
    }

    if(!schemas.includes(query.schema)) {
      return response.status(400).json({ error: `Schema "${query.schema}" is invalid.`});
    }

    const shop: any = database.get("shops")
      .find({ domain: query.shop })
      .value();

    if(!shop) {
      response.status(400).json({ error: `Shop "${query.shop}" is invalid.`});
    }

    const search = query.search ? Object.assign({}, query.search, { shop: shop.id }) : { shop: shop.id };

    const result = database.get(query.schema)
      .filter(search)
      .value();

    return response.status(200).json({ items: result })
  }
}]


export interface FindQuery {
  schema: "shops"|"logs"|"templates"|"default_templates";
  shop: string;
  search?: any;
}
