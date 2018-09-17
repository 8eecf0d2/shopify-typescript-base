import * as dynamoose from "dynamoose";

export class Database {
  static async Find (schema: string, shop: string, query: any): Promise<{templates: any[]}> {

    return {
      templates: [{
        id: "d8761cb5-cc8f-46f6-8431-aef10558114e",
        title: "Invoice",
        shop: "55a81720-6d4e-41b3-8dfb-570f47b3933a",
        content: "<p style=\"float: right; text-align: right; margin: 0;\">\n  {{ \"now\" | date: \"%m/%d/%y\" }}<br />\n  Invoice for {{ order.number }}\n</p>\n\n<div style=\"float: left; margin: 0 0 1.5em 0;\" >\n  <strong style=\"font-size: 2em;\">{{ shop.name }}</strong><br /><br />\n  {{ shop.address1 }}<br/>\n  {{ shop.city }} {{ shop.province_code }} {{ shop.zip | upcase }}<br/>\n  {{ shop.country_name }}\n</div>\n\n<hr />\n\n<h3 style=\"margin: 0 0 1em 0;\">Item Details</h3>\n\n<table class=\"table-tabular\" style=\"margin: 0 0 1.5em 0;\">\n  <thead>\n    <tr>\n      <th>Quantity</th>\n      <th>Item</th>\n      <th>Price</th>\n    </tr>\n  </thead>\n  <tbody>\n    {% for line_item in order.line_items %}\n      <tr>\n        <td>{{ line_item.quantity }} x</td>\n        <td><b>{{ line_item.title }}</b></td>\n        <td>\n          {% if line_item.original_price != line_item.price %}\n            <s>{{ line_item.original_price | money }}</s>\n          {% endif %}\n          {{ line_item.price | money }}\n        </td>\n      </tr>\n    {% endfor %}\n  </tbody>\n</table>\n\n{% if transactions.size > 1 %}\n  <h3 style=\"margin: 0 0 1em 0;\">Transaction Details</h3>\n  <table class=\"table-tabular\" style=\"margin: 0 0 1.5em 0;\">\n    <thead>\n      <tr>\n        <th>Type</th>\n        <th>Amount</th>\n        <th>Kind</th>\n        <th>Status</th>\n      </tr>\n    </thead>\n    <tbody>\n      {% for transaction in transactions %}\n        <tr>\n          <td>{{ transaction.gateway | payment_method }}</td>\n          <td>{{ transaction.amount | money }}</td>\n          <td>{{ transaction.kind }}</td>\n          <td>{{ transaction.status }}</td>\n        </tr>\n      {% endfor %}\n    </tbody>\n  </table>\n{% endif %}\n\n<h3 style=\"margin: 0 0 1em 0;\">Payment Details</h3>\n\n<table class=\"table-tabular\" style=\"margin: 0 0 1.5em 0;\">\n  <tr>\n    <td>Subtotal price:</td>\n    <td>{{ subtotal_price | money }}</td>\n  </tr>\n  {% for discount in discounts %}\n  <tr>\n    <td>Includes discount \"{{ discount.code }}\"</td>\n    <td>{{ discount.savings | money }}</td>\n  </tr>\n  {% endfor %}\n  <tr>\n    <td>Total tax:</td>\n    <td>{{ tax_price | money }}</td>\n  </tr>\n  {% if shipping_address %}\n    <tr>\n      <td>Shipping:</td>\n      <td>{{ shipping_price | money }}</td>\n    </tr>\n  {% endif %}\n  <tr>\n    <td><strong>Total price:</strong></td>\n    <td><strong>{{ total_price | money }}</strong></td>\n  </tr>\n  {% if total_paid != total_price %}\n    <tr>\n      <td><strong>Total paid:</strong></td>\n      <td><strong>{{ total_paid | money }}</strong></td>\n    </tr>\n    <tr>\n      <td><strong>Outstanding Amount:</strong></td>\n      <td><strong>{{ total_price | minus: total_paid | money }}</strong></td>\n    </tr>\n  {% endif %}\n</table>\n\n{% if note %}\n  <h3 style=\"margin: 0 0 1em 0;\">Note</h3>\n  <p>{{ note }}</p>\n{% endif %}\n\n{% if shipping_address %}\n  <h3 style=\"margin: 0 0 1em 0;\">Shipping Details</h3>\n\n  <div style=\"margin: 0 0 1em 0; padding: 1em; border: 1px solid black;\">\n    <strong>{{ shipping_address.name }}</strong><br/>\n    {% if shipping_address.company %}\n      {{ shipping_address.company }}<br/>\n    {% endif %}\n    {{ shipping_address.street }}<br/>\n    {{ shipping_address.city }}\n    {{ shipping_address.province_code }}\n    {{ shipping_address.zip | upcase }}<br/>\n    {{ shipping_address.country }}\n  </div>\n{% endif %}\n\n<p>If you have any questions, please send an email to <u>{{ shop.email }}</u></p>",
        default: true,
        createdAt: "2018-09-09T05:46:16.481Z",
        updatedAt: 1536794584281
      },{
        id: "c9d41dd0-113f-4b5b-a251-7d6c832138b8",
        title: "Packing Slip",
        shop: "55a81720-6d4e-41b3-8dfb-570f47b3933a",
        content: "<div style=\"margin: 0 0 1.5em 0; padding: 1.5em; border: 1px solid black;\">\n  <h2 style=\"margin: 0 0 1em 0;\">Sender</h2>\n  <strong>{{ shop.name }}</strong><br/>\n  {{ shop.address1 }}<br/>\n  {{ shop.city }} {{ shop.province_code }} {{ shop.zip | upcase }}<br/>\n  {{ shop.country_name }}\n</div>\n\n{% if order.shipping_address %}\n  <div style=\"padding: 1.5em; border: 1px solid black;\">\n    <h2 style=\"margin: 0 0 1em 0;\">Recipient</h2>\n    <strong>{{ order.shipping_address.name }}</strong><br/>\n    {% if order.shipping_address.company %}\n      {{ order.shipping_address.company }}<br/>\n    {% endif %}\n    {{ order.shipping_address.address1 }}<br/>\n    {{ order.shipping_address.city }} {{ order.shipping_address.province_code }} {{ order.shipping_address.zip | upcase }}<br/>\n    {{ order.shipping_address.country }}\n  </div>\n{% endif %}",
        default: false,
        createdAt: "2018-09-09T05:46:16.481Z",
        updatedAt: 1536701374414
      }]
    }
  }
}
