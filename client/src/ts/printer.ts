//@ts-ignore
import * as Liquid from "liquidjs";
import { resource } from "./resource";
const liquid = Liquid();

import { OrderSchema, TemplateSchema } from "../../../shared/ts/shcema";

export class Printer {
  static async print (template: TemplateSchema.Object, order: OrderSchema.Object): Promise<string> {
    const html = await liquid.parseAndRender(template.content, await Printer.variables(order.id));

    return html;
  }

  static async variables (order?: string): Promise<Printer.Variables> {
    const requests = {
      shop: await resource.shopify.handler({ method: "GET", path: `/admin/shop.json` }),
      order: !order ? { data: { order: OrderSchema.empty() } } : await resource.shopify.handler({ method: "GET", path: `/admin/orders/${order}.json` }),
    }

    return {
      shop: requests.shop.data.shop,
      order: OrderSchema.parse(requests.order.data.order)[0],
    }
  }
}

export namespace Printer {
  export interface Variables {
    shop: any;
    order: OrderSchema.Object;
  }
}
