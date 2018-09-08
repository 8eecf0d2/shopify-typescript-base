import { WebServer } from "./web-server";
import { endpoints } from "./endpoints";
import * as fs from "fs";

/** process .env file */
fs.readFileSync(".env", "utf8")
  .split("\n")
  .filter(variable => variable !== "")
  .forEach((variable: string) => process.env[variable.split("=")[0]] = variable.split("\"")[1]);

const server = new WebServer(2080, 2443);

/** Shopify Static Assets */
server.static("/shopify/bundle.js", "dist/bundle.js");
server.static("/shopify/bundle.js.map", "dist/bundle.js.map");
server.static(["/shopify", "/shopify/logs", "/shopify/settings"], "src/client/html/index.html");

server.handle(endpoints);

server.start();
