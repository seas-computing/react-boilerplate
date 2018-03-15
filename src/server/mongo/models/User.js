/** Mongoose Schema for Users
 * @module  server/mongo/models/User
 * @requires  mongoose
 */

import { Schema } from "mongoose";

/**
 * Enum for user access levels.
 * @enum  {string}
 * @memberof  module:server/mongo/models/User
 */

const AccessLevel = {
  READ_ONLY: "Read-Only",
  PRIVILEGED: "Privileged",
  ADMIN: "Admin"
};
let accessLevels = [];
for (let key of Object.keys(AccessLevel)) {
  accessLevels.push(AccessLevel[key]);
}

/**
 * The Schema for a User.
 * @const {Schema} UserSchema
 * @memberof  module:server/mongo/models/User
 * @prop  HUID  {String}  The user's Harvard ID
 * @prop  firstName  {String}  The user's first name
 * @prop  lastName  {String}  The user's last name
 * @prop  email  {String}  The user's Harvard email
 * @prop  accessLevel  {String}  The user's permission level
 * @prop  settings  {Object}  Any additional settings
 */

export const UserSchema = new Schema(
  {
    HUID: { type: String, required: true, index: { unique: true } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accessLevel: { type: String, enum: accessLevels, default: accessLevels[0] },
    settings: {}
  },
  {
    timestamps: true,
    collection: "users"
  }
);

/**
 * Creates a new user with the given data and returns a Promise
 * @static
 * @async
 * @function  addNew
 * @memberof  module:server/mongo/models/User
 * @param  {UserData}  data  The user to be added to the database
 * @return  {Promise<UserData>}  The mongo object for the saved user
 * @throws  {ValidationError}  If Permission is invalid
 * @throws  {MongoError}  If HUID is already in use
 * @throws  {Error}  If anything else goes wrong
 */

UserSchema.statics.addNew = async function(data) {
  try {
    let user = new this(data);
    return await user.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new Error(`Error: That HUID is already in use.`);
    } else if (err.name === "ValidationError") {
      throw new Error(`Error: Invalid permission provided.`);
    } else {
      throw new Error(`Error: Could not create a new user\nError: ${err}`);
    }
  }
};

/**
 * Retrieves all of the users in the database
 * @static
 * @async
 * @function  getAll
 * @memberof  module:server/mongo/models/User
 * @return  {Promise<UserData[]>}  An array containing all users in the system
 * @throws  {Error}  If data cannot be fetched
 */

UserSchema.statics.getAll = async function getAll() {
  try {
    return await this.find().exec();
  } catch (err) {
    throw new Error(`Could not fetch all user records`);
  }
};

/**
 * Retrieves the user with the given mongo ID
 * @static
 * @async
 * @function  getOneById
 * @memberof  module:server/mongo/models/User
 * @param  {string}  userId  The mongoid for the user
 * @return  {Promise<UserData>}  The mongo data for the user
 * @throws  {Error} If the person cannot be found
 */

UserSchema.statics.getOneById = async function getOne(userId) {
  try {
    return await this.findById(userId).exec();
  } catch (err) {
    throw new Error(`No user record for ${userId}\nError: ${err}`);
  }
};

/**
 * Retrieves the user with the given HUID.
 * @static
 * @async
 * @function  getOneByHUID
 * @memberof  module:server/mongo/models/User
 * @param  {string}  HUID  The 8-digit HUID for the user
 * @returns  {Promise<UserData>}  The MongoData for the user
 * @throws  {Error}  If the user cannot be found
 */

UserSchema.statics.getOneByHUID = async function getOneByHUID(HUID) {
  try {
    return await this.findOne({ HUID: HUID }).exec();
  } catch (err) {
    throw new Error(`No user record with HUID ${HUID}.\nError: ${err}`);
  }
};

/**
 * Updates the user instance with the given data. Only fields present
 * in the data object will be updated.
 * @instance
 * @async
 * @function  update
 * @memberof  module:server/mongo/models/User
 * @param  {UserData}  data  The new data for the user
 * @returns  {Promise<UserData>}  The updated user
 * @throws  {Error}  If the user cannot be updated
 */

UserSchema.methods.update = async function update(data) {
  let user = this;
  try {
    UserSchema.eachPath(prop => {
      if (prop in data && user[prop] !== data[prop]) {
        user.set(prop, data[prop]);
      }
    });
    return await user.save();
  } catch (err) {
    throw new Error(`Unable to update user with id ${user.id}\nError: ${err}`);
  }
};

/**
 * Deletes the user instance.
 * @instance
 * @async
 * @function  delete
 * @memberof  module:server/mongo/models/User
 * @returns  {Promise<UserData>}  The deleted user's data
 * @throws  {Error}  If the user cannot be deleted
 */

UserSchema.methods.delete = async function() {
  let user = this;
  try {
    return await user.remove();
  } catch (err) {
    throw new Error(`Could not delete user with id ${user.id}.\nError: ${err}`);
  }
};
