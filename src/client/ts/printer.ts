//@ts-ignore
import * as Liquid from "liquidjs";
const liquid = Liquid();

import { OrderSchema, TemplateSchema } from "../../shared/ts/shcema";

export class Printer {
  static async print (template: TemplateSchema.Object, order: OrderSchema.Object): Promise<string> {
    const html = await liquid.parseAndRender(template.content, { order: order });

    return html;
  }
}
