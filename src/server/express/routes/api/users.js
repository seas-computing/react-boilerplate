import { Router } from "express";
import { connection } from "../../../mongo";

export const UsersRouter = Router();

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
 * @apiDefine SingleUserRequest
 * @apiParam  {String}  HUID 8-digit Harvard ID
 * @apiParam  {String}  firstName User's first name
 * @apiParam  {String}  lastName User's last name
 * @apiParam  {String}  email User' email address
 * @apiParam  {String}  [accessLevel="Read-Only"] User permission level
 *
 * @apiParamExample Request Body
 *    {
 *      HUID: "88888888",
 *      firstName: "Example",
 *      lastName: "User",
 *      email: "help@seas.harvard.edu",
 *      accessLevel: "Admin",
 *    },
 *
 */

/**
 * @apiDefine SingleUserResponse
 * @apiSuccess  {String}  _id  mongoID for user
 * @apiSuccess  {String}  id  non-object mongoID for user
 * @apiSuccess  {Date}  updatedAt date user was last updated
 * @apiSuccess  {Date}  createdAt date user was created
 * @apiSuccess  {String}  HUID 8-digit Harvard ID
 * @apiSuccess  {String}  firstName User's first name
 * @apiSuccess  {String}  lastName User's last name
 * @apiSuccess  {String}  email User' email address
 * @apiSuccess  {Number}  __v number of revisions to user
 * @apiSuccess  {String}  accessLevel User permission level
 *
 * @apiSuccessExample Response Body
 *    HTTP/1.1 200 OK
 *    {
 *      _id: "1a2b3c4d536f7a8b9c0d1a2",
 *      updatedAt: "2018-03-01T20:22:38.730Z",
 *      createdAt: "2018-03-01T20:19:36.592Z",
 *      HUID: "88888888",
 *      firstName: "Example",
 *      lastName: "User",
 *      email: "help@seas.harvard.edu",
 *      __v: 0,
 *      accessLevel: "Admin",
 *      id: "1a2b3c4d536f7a8b9c0d1a2",
 *    },
 *
 *
 */

/**
 * @apiDefine MultiUserResponse
 * @apiSuccess {object[]} users
 * @apiSuccess  {String}  users._id  mongoID for user
 * @apiSuccess  {String}  users.id  non-object mongoID for user
 * @apiSuccess  {Date}  users.updatedAt date user was last updated
 * @apiSuccess  {Date}  users.createdAt date user was created
 * @apiSuccess  {String}  users.HUID 8-digit Harvard ID
 * @apiSuccess  {String}  users.firstName User's first name
 * @apiSuccess  {String}  users.lastName User's last name
 * @apiSuccess  {String}  users.email User's email address
 * @apiSuccess  {Number}  users.__v number of revisions to user
 * @apiSuccess  {String}  users.accessLevel User permission level
 *
 *   @apiSuccessExample Response Body
 *    HTTP/1.1 200 OK
 *      [
 *        {
 *          _id: "1a2b3c4d536f7a8b9c0d1a2",
 *          updatedAt: "2018-03-01T20:22:38.730Z",
 *          createdAt: "2018-03-01T20:19:36.592Z",
 *          HUID: "88888888",
 *          firstName: "Example",
 *          lastName: "User",
 *          email: "help@seas.harvard.edu",
 *          __v: 0,
 *          accessLevel: "Admin",
 *          id: "1a2b3c4d536f7a8b9c0d1a2",
 *        },
 *        {
 *          _id: "2a1d0c9b8a7f6e5d4c3b2a1",
 *          updatedAt: "2018-03-01T20:22:38.730Z",
 *          createdAt: "2018-03-01T20:19:36.592Z",
 *          HUID: "99999999",
 *          firstName: "Second",
 *          lastName: "User",
 *          email: "ithelp@harvard.edu",
 *          __v: 0,
 *          accessLevel: "Privileged",
 *          id: "2a1d0c9b8a7f6e5d4c3b2a1",
 *        },
 *      ]
 */

/**
 * Returns information about the currently authenticated user
 * @api {GET} /api/users/current
 * @apiName GetUser
 * @apiGroup User
 * @apiUse SingleUserResponse
 * @apiUse ExpressError
 * @apiPermission ReadOnly
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
 * @api  {POST}  /api/users/new
 * @apiName  AddUser
 * @apiGroup User
 * @apiUse SingleUserResponse
 * @apiUse SingleUserRequest
 * @apiUse ExpressError
 * @apiUse PermissionError
 * @apiPermission Admin
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
 * @api {GET} /api/users/all
 * @apiName AllUsers
 * @apiGroup User
 * @apiUse SingleUserResponse
 * @apiUse ExpressError
 * @apiUse PermissionError
 * @apiPermission Admin
 */

UsersRouter.get("/all", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res
      .status(401)
      .json({ error: "Only admin users can access the list of users." });
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
 * @api {GET} /api/users/:userId
 * @apiName GetOneUser
 * @apiGroup User
 * @apiParam {String} userId User's MongoId
 * @apiUse SingleUserResponse
 * @apiUse ExpressError
 * @apiUse PermissionError
 * @apiPermission Admin
 */

UsersRouter.get("/:userId", async (req, res, next) => {
  if (req.session.user_accessLevel !== "Admin") {
    res.status(401).send({ error: "Only admin users can access a user." });
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
 * @api {PUT} /api/users/:userId
 * @apiName UpdateOneUser
 * @apiGroup User
 * @apiParam {String} userId User's MongoId
 * @apiUse SingleUserResponse
 * @apiUse SingleUserRequest
 * @apiUse ExpressError
 * @apiUse PermissionError
 * @apiPermission Admin
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
 * @api {DELETE} /api/users/:userId
 * @apiName DeleteOneUser
 * @apiGroup User
 * @apiParam {String} userId User's MongoId
 * @apiUse SingleUserResponse
 * @apiUse ExpressError
 * @apiUse PermissionError
 * @apiPermission Admin
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
