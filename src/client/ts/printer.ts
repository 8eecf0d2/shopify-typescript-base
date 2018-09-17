//@ts-ignore
import * as Liquid from "liquidjs";
import { resource } from "./resource";
const liquid = Liquid();

import { OrderSchema, TemplateSchema } from  "../../shared/ts/shcema";

export class Printer {
  static async print (template: TemplateSchema.Object, order: OrderSchema.Object): Promise<string> {
    const html = await liquid.parseAndRender(template.content, await Printer.variables(order.id));

    return html;
  }

  static async variables (order?: string): Promise<Printer.Variables> {
    const variableQueries = {
      shopQuery: await resource.shopify.query({ method: "GET", path: `/admin/shop.json` }),
      orderQuery: !order ? { order: OrderSchema.empty() } : await resource.shopify.query({ method: "GET", path: `/admin/orders/${order}.json` }),
    }

    return {
      shop: variableQueries.shopQuery.shop,
      order: OrderSchema.parse(variableQueries.orderQuery.order)[0],
    }
  }
}

export namespace Printer {
  export interface Variables {
    shop: any;
    order: OrderSchema.Object;
  }
}
