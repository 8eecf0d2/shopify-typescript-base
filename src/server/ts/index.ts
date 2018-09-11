import * as path from "path";
import * as cookie from "cookie";
import { WebServer } from "../../shared/ts/web-server";
import { dotEnvConfig } from "../../shared/ts/env";
import { endpoints } from "./endpoints";
import { CheckShopifyAuth } from "./middleware"

process.env = {
  ...process.env,
  ...dotEnvConfig(),
}

const server = new WebServer(
  parseInt(process.env.SERVER_HTTP_PORT),
  parseInt(process.env.SERVER_HTTPS_PORT)
);

server.route({
  method: "get",
  path: "/shopify",
  handler: [CheckShopifyAuth, (request, response) => {
    const query = request.query;
    const cookies = cookie.parse(String(request.headers.cookie));
    // if no shop in query or cookies (ask for shop)
    if(!query.shop && !cookies.shop) {
      return response.redirect("/shopify/install");
    }
    // if shop in query and doesn't match cookie (setup shop)
    if(query.shop && query.shop !== cookies.shop) {
      return response.redirect(`/shopify/setup?shop=${request.query.shop}`);
    }
    // otherwise send them the app
    return response.sendFile(path.resolve("src/client/html/index.html"));
  }]
});

/** Shopify Static Assets */
server.static("/shopify/assets/css/highlight.css", "dist/highlight.css");
server.static("/shopify/client.js", "dist/client.js");
server.static("/shopify/client.js.map", "dist/client.js.map");
server.static([
  "/shopify/install",
  "/shopify/orders",
  "/shopify/orders/:id",
  "/shopify/templates",
  "/shopify/templates/:id",
  "/shopify/settings",
], "src/client/html/index.html");

server.handle(endpoints);

server.start();
