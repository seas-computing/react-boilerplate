import * as dummy from "../data";
import * as models from "../../../server/mongo/models";

const populateUsers = async connection => {
  let result = {};
  result.regularUser = await connection.model("User").addNew(dummy.regularUser);
  result.privilegedUser = await connection
    .model("User")
    .addNew(dummy.privilegedUser);
  result.adminUser = await connection.model("User").addNew(dummy.adminUser);
  return result;
};

export const populate = async (connection, opts = {}) => {
  if (opts.schemas) {
    for (let model in models) {
      let name = model.replace(/Schema$/, "");
      let schema = models[model];
      connection.model(name, schema);
    }
  }
  return {
    ...(await populateUsers(connection))
  };
};

export const depopulate = async connection => {
  for (let collection in connection.collections) {
    await connection.collections[collection].drop();
  }
  return true;
};
