import * as fs from "fs";

export const dotEnvConfig = () => {
  return fs.readFileSync(".env", "utf8")
    .split("\n")
    .filter(variable => variable !== "")
    .reduce((env: any, variable: string) => {
      env[variable.split("=")[0]] = variable.split("\"")[1];
      return env;
    }, {});
}
