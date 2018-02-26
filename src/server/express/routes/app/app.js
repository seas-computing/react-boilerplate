import { Router } from "express";
// import { EXPRESS } from "../../../config";
import cas from "../../cas";

export const AppRouter = Router();

AppRouter.use("/static/", function(req, res, next) {
  res.redirect(req.originalUrl.replace(/^\/app/, ""));
});

// Set up CAS routes.
AppRouter.use("/logout", function(req, res, next) {
  delete req.session.user_accessLevel;
  next();
});
AppRouter.get("/logout", cas.logout);
AppRouter.get("/authenticate", cas.bounce_redirect);
