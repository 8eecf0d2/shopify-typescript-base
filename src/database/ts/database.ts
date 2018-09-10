import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("database.json");
const database = lowdb(adapter);

database.defaults({ shops: [], logs: [], templates: [], default_templates: [] }).write();

export {
  database
}
