import supertest from "supertest";
import express from "express";
import { equal } from "assert";
import { AppRouter } from "../app";
import { CAS, EXPRESS, APP } from "../../../../config";

describe("AppRouter", function() {
  let testAPI;
  let result;

  before(function() {
    const app = express();
    app.use(AppRouter);
    testAPI = supertest(app);
  });

  describe("GET", function() {
    describe("/", function() {
      beforeEach(async function() {
        result = await testAPI.get("/");
      });
      it("should return StatusCode 200", function() {
        equal(result.statusCode, 200);
      });
      it("should return JSON", function() {
        equal(result.type, "application/json");
      });
      it("Should include the devMode", function() {
        equal(result.body.devMode, CAS.DEV_MODE);
      });
      it("Should include the devBuild", function() {
        equal(result.body.devBuild, EXPRESS.DEV_BUILD);
      });
      it("Should include the currentAcademicYear", function() {
        equal(result.body.currentAcademicYear, APP.CURRENT_ACADEMIC_YEAR);
      });
    });
  });
});
