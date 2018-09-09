export const template = `
<div style="margin: 0 0 1.5em 0; padding: 1.5em; border: 1px solid black;">
  <h2 style="margin: 0 0 1em 0;">Sender</h2>
  <strong>{{ shop.name }}</strong><br/>
  {{ shop.owner }}<br/>
  {{ shop.address }}<br/>
  {{ shop.city }} {{ shop.province_code }} {{ shop.zip | upcase }}<br/>
  {{ shop.country }}
</div>

{% if shipping_address %}
<div style="padding: 1.5em; border: 1px solid black;">
  <h2 style="margin: 0 0 1em 0;">Recipient</h2>
  <strong>{{ shipping_address.name }}</strong><br/>
  {% if shipping_address.company %}
    {{ shipping_address.company }}<br/>
  {% endif %}
  {{ shipping_address.street }}<br/>
  {{ shipping_address.city }} {{ shipping_address.province_code }} {{ shipping_address.zip | upcase }}<br/>
  {{ shipping_address.country }}
</div>
{% endif %}
`;
