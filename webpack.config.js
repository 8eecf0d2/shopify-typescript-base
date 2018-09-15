const clientWebpackConfig = require("./src/client/webpack.config.js");
const serverWebpackConfig = require("./src/server/webpack.config.js");

module.exports = [
  clientWebpackConfig,
  serverWebpackConfig
]
