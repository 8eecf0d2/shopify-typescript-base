import { WebServer } from "../../shared/ts/web-server";
import { dotEnvConfig } from "../../shared/ts/env";
import { endpoints } from "./endpoints";

process.env = {
  ...process.env,
  ...dotEnvConfig(),
}

const server = new WebServer(
  parseInt(process.env.SERVER_HTTP_PORT),
  parseInt(process.env.SERVER_HTTPS_PORT)
);

/** Shopify Static Assets */
server.static("/shopify/assets/css/highlight.css", "dist/highlight.css");
server.static("/shopify/client.js", "dist/client.js");
server.static("/shopify/client.js.map", "dist/client.js.map");
server.static([
  "/shopify",
  "/shopify/logs",
  "/shopify/orders",
  "/shopify/orders/:id",
  "/shopify/templates",
  "/shopify/templates/:id",
  "/shopify/settings",
], "src/client/html/index.html");

server.handle(endpoints);

server.start();
