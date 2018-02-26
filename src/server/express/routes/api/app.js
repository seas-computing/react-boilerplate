import { Router } from "express";
import { EXPRESS, CAS, APP } from "../../../config";

export const AppRouter = Router();

AppRouter.get("/", function(req, res) {
  res.json({
    devMode: CAS.DEV_MODE,
    devBuild: EXPRESS.DEV_BUILD,
    currentAcademicYear: APP.CURRENT_ACADEMIC_YEAR
  });
});
