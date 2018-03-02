/** Express routes for app endpoints
 * @module routes/app
 * @requires express
 */

import { Router } from "express";
import cas from "../../cas";

/**
 * Express Router for the App API
 * @name AppRouter
 * @memberof module:routes/app
 * @const
 */

export const AppRouter = Router();

/**
 * Redirects static assets to the top level.
 *
 * @name Static Directory
 * @memberof module:routes/app
 * @route {ALL} /app/static/*
 * @routeparam {String} assetPath - Path to the requested asset
 * @status {301} redirect - strips /app/ from the request to redirect to the top level
 */

AppRouter.use("/static/", function(req, res, next) {
  res.redirect(req.originalUrl.replace(/^\/app/, ""));
});

/**
 * Remove the user session data from the database
 *
 * @name User Logout
 * @memberof module:routes/app
 * @route {all} /app/logout
 */

AppRouter.use("/logout", function(req, res, next) {
  delete req.session.user_accessLevel;
  next();
});

/**
 * Log the user out of Harvard Key
 *
 * @name Harvard Key Logoout
 * @memberof module:routes/app
 * @route {GET} /app/logout
 * @see https://github.com/kylepixel/cas-authentication
 */

AppRouter.get("/logout", cas.logout);

/**
 * Direct the user to Harvard Key login
 *
 * @name Harvard Key Login
 * @memberof module:routes/app
 * @route {GET} /app/authenticate
 * @see https://github.com/kylepixel/cas-authentication
 */

AppRouter.get("/authenticate", cas.bounce_redirect);
