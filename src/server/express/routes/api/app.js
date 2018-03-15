import { Router } from "express";
import { EXPRESS, CAS, APP } from "../../../config";

export const AppRouter = Router();

/**
 * Returns information about the app, useful for making sure the server is configured as expected.
 *
 * @api {GET} /api/app/
 * @apiName  Get App Data
 * @apiGroup  App
 *
 * @apiSuccess  {Boolean}  devMode  CAS is running in dev mode
 * @apiSuccess  {Boolean}  devBuild  Express is running in dev mode
 * @apiSuccess  {Number}  currentAcademicYear  Current academic year in config.js
 *
 * @apiSuccessExample  Response Body:
 *    HTTP/1.1 200 OK
 *    {
 *      devMode: true,
 *      devBuild: true,
 *      currentAcademicYear: 2018
 *    }
 *
 * @apiUse  ExpressError
 * @apiPermission  ReadOnly
 */
AppRouter.get("/", function(req, res) {
  res.json({
    devMode: CAS.DEV_MODE,
    devBuild: EXPRESS.DEV_BUILD,
    currentAcademicYear: APP.CURRENT_ACADEMIC_YEAR
  });
});
