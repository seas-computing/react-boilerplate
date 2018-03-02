/** Express routes for app api
 * @module routes/api/app
 * @requires express
 */

import { Router } from "express";
import { EXPRESS, CAS, APP } from "../../../config";

/**
 * Express Router for the App API
 * @name AppRouter
 * @memberof module:routes/api/app
 * @const
 */
export const AppRouter = Router();

/**
 * Returns information about the app, useful for making sure the server is configured as expected.
 *
 * @name Get App Data
 * @memberof module:routes/api/app
 * @route {GET} /api/app/
 * @response {Boolean} body.devMode - Whether CAS is in dev mode
 * @response {boolean} body.devBuild - Whether Express is using a dev build
 * @response {String} body.currentAcademicYear - The current academic year set in config.js
 */
AppRouter.get("/", function(req, res) {
  res.json({
    devMode: CAS.DEV_MODE,
    devBuild: EXPRESS.DEV_BUILD,
    currentAcademicYear: APP.CURRENT_ACADEMIC_YEAR
  });
});
