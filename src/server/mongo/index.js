import extend from "extend";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from "connect-mongo";
import { MONGO } from "../config";
import * as models from "./models";

let MongoStore = connectMongo(session);

mongoose.Promise = global.Promise;

export const connection = mongoose.createConnection(MONGO.URI, MONGO.OPTIONS);

// Look at each file in the models/ folder.
for (let model in models) {
  //drop Schema from name for saner mappings
  let name = model.replace("Schema", "");
  let schema = models[model];
  schema.set("toJSON", { getters: true, virtuals: true });
  schema.set("toObject", { getters: true, virtuals: true });
  connection.model(name, schema);
}

// Set up session store.
export const store = new MongoStore(
  extend({ mongooseConnection: connection }, MONGO.STORE_OPTIONS)
);
