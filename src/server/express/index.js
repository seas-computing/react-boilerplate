import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import session from "express-session";
import morgan from "morgan";
import compression from "compression";
import cas from "./cas";
import { store, connection } from "../mongo";
import { EXPRESS, SERVER } from "../config";
import * as routes from "./routes";
import path from "path";

//initialize express app
const app = express();

//Set up third-party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser("secret"));
let upload = multer({ dest: EXPRESS.TEMP_DIR });
app.use(upload.any());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: EXPRESS.SESSION_SECRET,
    store: store
  })
);
app.use(morgan("combined"));
app.use(compression());

//Handle CAS access
app.use(
  "/",
  // Protect all API requests with the CAS blocker. Unauthorized users will receive a 401
  // Unauthorized response.
  cas.bounce,
  // Store user access level from database once CAS verified.
  function(req, res, next) {
    // If there is a CAS user but not session user data, retrieve the user data.
    if (req.session.cas_user && !req.session.user_accessLevel) {
      connection
        .model("User")
        .getOneByHUID(req.session.cas_user)
        .then(data => {
          req.session.user_accessLevel = data.accessLevel;
          req.session.user_id = data.id;
          next();
        })
        .catch(err => {
          req.session.user_accessLevel = null;
          next();
        });
    } else {
      next();
    }
  }
);

//Handle client application routes
app.get("/", (req, res, next) => {
  res.redirect("/app");
});

//Server-side rendering

app.get(
  "/app",
  // Block requests from users that are not in the system.
  (req, res, next) => {
    if (!req.session.user_accessLevel) {
      res.status(401).send("You are not authorized to use this system.");
      return;
    }
    next();
  },
  (req, res, next) => {
    if (module.hot) {
      //skips the route during hot reloading as index.html is served by the client
      next();
    } else {
      //webpack replaces __dirname with the **built** file's directory
      res.status(200).sendFile(path.resolve(__dirname, "./index.html"));
    }
  }
);

for (let router in routes.app) {
  app.use("/app", routes.app[router]);
}

app.use(
  "/api",
  // Block requests from users that are not in the system.
  (req, res, next) => {
    if (!req.session.user_accessLevel) {
      res
        .status(401)
        .json({ error: "You are not authorized to use this application." });
      return;
    }
    if (
      ["POST", "PUT", "DELETE"].includes(req.method) &&
      req.session.user_accessLevel === "Read-Only"
    ) {
      res
        .status(401)
        .json({ error: "You do not have permission to edit data." });
      return;
    }
    next();
  }
);

//import routes from directory
for (let router in routes.api) {
  let name = router.replace("Router", "").toLowerCase();
  app.use("/api/" + name, routes.api[router]);
}

app.use("/static", express.static(path.resolve(__dirname, "./static")));

app.get("/logout", cas.logout);

//Simple error handling
export const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
  res.end();
  if (process.env.NODE_ENV !== "testing") {
    console.log(err);
  }
};
app.use(errorHandler);

// More Express configuration.
app.enable("trust proxy");
app.disable("etag");
app.set("host", SERVER.HOST);
app.set("port", SERVER.PORT);

//export our Express setup
export default app;
