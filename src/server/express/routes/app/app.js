import { Router } from "express";
import cas from "../../cas";

export const AppRouter = Router();

/**
 * Redirects static assets to the top level
 * @api {GET} /app/static/*
 * @apiGroup App
 * @apiName  StaticAssets
 * @apiParam {String} path requested asset
 * @apiSuccess (301 Redirect) {301} Redirect strips /app/ from the request to redirect to the top level
 */

AppRouter.get("/static/", function(req, res, next) {
  res.redirect(req.originalUrl.replace(/^\/app/, ""));
});

/**
 * Remove the user session data from the database and log out of Harvard Key
 * @api {GET} app/logout
 * @apiName UserLogout
 * @apiGroup App
 * @apiSuccess (301 Redirect) {301} Redirects to Harvard Key Logout
 */

AppRouter.get("/logout", function(req, res, next) {
  delete req.session.user_accessLevel;
  next();
});

AppRouter.get("/logout", cas.logout);

/**
 * Direct the user to Harvard Key login
 *
 * @api {GET} /app/authenticate
 * @apiName HarvardKeyLogin
 * @apiGroup App
 * @apiSuccess (301 Redirect) {301} Redirects to Harvard Key Login
 */

AppRouter.get("/authenticate", cas.bounce_redirect);
