const clientConfig = require("./src/client/webpack.config.js");
const serverConfig = require("./src/server/webpack.config.js");
const databaseConfig = require("./src/database/webpack.config.js");

module.exports = [
  ...clientConfig,
  serverConfig,
  databaseConfig,
];
