import { LineItemSchema } from "./line-item";

export class OrderSchema {

  static parse (orders: OrderSchema.Object|OrderSchema.Object[]): OrderSchema.Object[] {
    orders = Array.isArray(orders) ? orders : [orders];
    return orders.map(order => ({
      ...order,
      id: String(order.id)
    }))
  }

  static empty (): OrderSchema.Object {
    return {
      id: "",
      email: "",
      closed_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      number: 0,
      note: "",
      token: "",
      gateway: "",
      test: true,
      total_price: "",
      subtotal_price: "",
      total_weight: 0,
      total_tax: "",
      taxes_included: true,
      currency: "",
      financial_status: "",
      confirmed: true,
      total_discounts: 0,
      total_line_items_price: "",
      cart_token: "",
      buyer_accepts_marketing: true,
      name: "",
      referring_site: "",
      landing_site: "",
      cancelled_at: new Date(),
      cancel_reason: "",
      total_price_usd: "",
      checkout_token: "",
      reference: "",
      user_id: "",
      location_id: "",
      source_identifier: "",
      source_url: "",
      processed_at: new Date(),
      device_id: "",
      phone: "",
      customer_locale: "",
      app_id: "",
      browser_ip: "",
      landing_site_ref: "",
      order_number: 0,
      discount_applications: [], /** TODO */
      discount_codes: [], /** TODO */
      note_attributes: [], /** TODO */
      payment_gateway_names: [],
      processing_method: "",
      checkout_id: 0,
      source_name: "",
      fulfillment_status: "",
      tax_lines: [], /** TODO */
      tags: "",
      contact_email: "",
      order_status_url: "",
      lines_items: [],
    };
  }
}

export namespace OrderSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    email: string;
    closed_at: Date;
    created_at: Date;
    updated_at: Date;
    number: number;
    note: string;
    token: string;
    gateway: string;
    test: boolean;
    total_price: string;
    subtotal_price: string;
    total_weight: number;
    total_tax: string;
    taxes_included: boolean;
    currency: string;
    financial_status: string;
    confirmed: boolean;
    total_discounts: number;
    total_line_items_price: string;
    cart_token: string;
    buyer_accepts_marketing: boolean;
    name: string;
    referring_site: string;
    landing_site: string;
    cancelled_at: Date;
    cancel_reason: string;
    total_price_usd: string;
    checkout_token: string;
    reference: string;
    user_id: string;
    location_id: string;
    source_identifier: string;
    source_url: string;
    processed_at: Date;
    device_id: string;
    phone: string;
    customer_locale: string;
    app_id: string;
    browser_ip: string;
    landing_site_ref: string;
    order_number: number;
    discount_applications: any[]; /** TODO */
    discount_codes: any[]; /** TODO */
    note_attributes: any[]; /** TODO */
    payment_gateway_names: string[];
    processing_method: string;
    checkout_id: number;
    source_name: string;
    fulfillment_status: string;
    tax_lines: any[]; /** TODO */
    tags: string;
    contact_email: string;
    order_status_url: string;
    lines_items: LineItemSchema[];
  }

}
