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

// Get current.
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

// Create.
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

// Get all.
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

// Get one.
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

// Update.
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

// Remove.
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
