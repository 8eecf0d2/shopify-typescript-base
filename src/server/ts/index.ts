import * as path from "path";
import { WebServer } from "./web-server";
import { endpoints } from "./endpoints";

const server = new WebServer(2010);

/** Shopify Static Assets */
server.static("/shopify/bundle.js", "dist/bundle.js");
server.static("/shopify/bundle.js.map", "dist/bundle.js.map");
server.static("/shopify*", "src/client/html/index.html");

server.handle(endpoints);

server.start();
