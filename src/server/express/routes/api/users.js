/** Express routes for user api
 * @module routes/api/users
 * @requires express
 */

import { Router } from "express";
import { connection } from "../../../mongo";

/**
 * Express Router for the User API
 * @name UsersRouter
 * @memberof module:routes/api/users
 * @const
 */
export const UsersRouter = Router();

/**
  Sets authorization limits on the POST, PUT, and DELETE routes below.
  Only Admins are permitted to manage users. All others will receive an error.
 */
UsersRouter.use((req, res, next) => {
  if (
    ["POST", "PUT", "DELETE"].includes(req.method) &&
    req.session.user_accessLevel !== "Admin"
  ) {
    res
      .status(401)
      .json({ error: "You do not have permission to manage users." });
    return;
  }
  next();
});

/**
 * Returns information about the currently authenticated user.
 * @name Get Current User
 * @memberof module:routes/api/users
 * @route {GET} /api/users/current
 * @returns {Promise} Promise that resolves to a request object whose body contains the current user
 */

UsersRouter.get("/current", async (req, res, next) => {
  try {
    let docs = await connection
      .model("User")
      .getOneByHUID(req.session.cas_user);
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * Adds a new user defined in the request body
 * @name Add New User
 * @memberof module:routes/api/users
 * @route {POST} /api/users/new
 * @bodyparam {String} HUID - The user's 8-digit HUID
 * @bodyparam {String} firstName - The users' first name
 * @bodyparam {String} lastName - The user's last name
 * @bodyparam {String} email - The user's harvard email address
 * @bodyparam {String} [accessLevel="Read-Only"] - The user's permissions in the app. Must be one of "Read-Only", "Privileged", or "Admin"
 * @authentication Requires CAS Authentication. User must have "Admin" permissions.
 * @returns {Promise} Promise that resolves to a request object whose body contains the mongo representation of the new user.
 */

UsersRouter.post("/new", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send("Only admin users can create a user.");
    return;
  }
  try {
    let docs = await connection.model("User").addNew(req.body);
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * Returns all users in the system
 * @name Get All Users
 * @memberof module:routes/api/users
 * @route {GET} /api/users/all
 * @authentication Requires CAS Authentication. User must have "Admin" permissions.
 * @returns {Promise} Promise that resolves to a request object whose body contains all users in the system.
 */

UsersRouter.get("/all", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send("Only admin users can access the list of users.");
    return;
  }
  try {
    let docs = await connection.model("User").getAll();
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * Returns information about the user with given id
 * @name Get One User
 * @memberof module:routes/api/users
 * @route {GET} /apiusers/:userId
 * @routeparam {String} userId - The mongo id for the user
 * @authentication Requires CAS Authentication. User must have "Admin" permissions.
 * @returns {Promise} Promise that resolves to a request object whose body contains the user requested.
 */

UsersRouter.get("/:userId", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send("Only admin users can access a user.");
    return;
  }
  try {
    let docs = await connection.model("User").getOneById(req.params.userId);
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * Update the user with given id
 * @name Update User
 * @memberof module:routes/api/users
 * @route {PUT} /api/users/:userId
 * @routeparam {String} userId - mongo id for the user
 * @bodyparam {String} [firstName] - The new first name for the user
 * @bodyparam {String} [lastName] - The new first name for the user
 * @bodyparam {String} [email] - The new email for the user
 * @bodyparam {String} [accessLevel] - The user's permissions in the app. Must be one of "Read-Only", "Privileged", or "Admin"
 * @authentication Requires CAS Authentication. User must have "Admin" permissions.
 * @status {200} OK
 * @status {401} Unauthorized - Must have "Admin" privileges
 * @status {500} Error - Was not able to update the user
 * @responsebody {Object} user - The updated user object
 */

UsersRouter.put("/:userId", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send("Only admin users can update a user.");
    return;
  }
  try {
    let user = await connection.model("User").getOneById(req.params.userId);
    let docs = await user.update(req.body);
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});

/**
 * Delete the user with given id
 * @name Delete User
 * @memberof module:routes/api/users
 * @route {DELETE} /api/users/:userId
 * @routeparam {String} userId - mongo id for the user to be deleted
 * @authentication Requires CAS Authentication. User must have "Admin" permissions.
 * @returns {Promise} Promise that resolves to a request object whose body contains the mongo representation of the delted user.
 */

UsersRouter.delete("/:userId", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send("Only admin users can remove a user.");
    return;
  }
  try {
    let user = await connection.model("User").getOneById(req.params.userId);
    let docs = await user.delete();
    res.json(docs);
    res.end();
  } catch (err) {
    next(err);
  }
});
