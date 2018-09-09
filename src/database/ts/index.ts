import { WebServer } from "../../shared/ts/web-server";
import { dotEnvConfig } from "../../shared/ts/env";
import { endpoints } from "./endpoints";

process.env = {
  ...process.env,
  ...dotEnvConfig(),
}

const server = new WebServer(
  parseInt(process.env.DATABASE_HTTP_PORT),
  parseInt(process.env.DATABASE_HTTPS_PORT)
);

server.handle(endpoints);

server.start();
