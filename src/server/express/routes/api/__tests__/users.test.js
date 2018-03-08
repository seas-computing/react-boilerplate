import supertest from "supertest";
import express from "express";
import { equal, notEqual } from "assert";
import { spy, stub } from "sinon";
import bodyParser from "body-parser";
import session from "express-session";
import { UsersRouter } from "../users";
import { connection, store } from "../../../../mongo";
import { errorHandler } from "../../../index";
import * as dummy from "../../../../../common/__tests__/data/index.js";
import {
  populate,
  depopulate
} from "../../../../../common/__tests__/boilerplate/populateDatabase";

describe("UsersRouter", function() {
  let result;
  let authAPI;
  let anonAPI;
  let sandbox;
  let User;
  let data;

  beforeEach(async () => {
    //populate the database with dummy data
    //This will only affect the mongodb-runner database
    data = await populate(connection);
    User = connection.model("User");
  });
  afterEach(async function() {
    await depopulate(connection);
  });

  //first test with proper permissions
  context("With Admin permission", function() {
    before(() => {
      //create a test express app
      //add basic middleware
      const app = express();
      app.use(bodyParser.json());
      //use express session for auth
      app.use(
        session({
          resave: false,
          saveUninitialized: true,
          secret: "secret",
          store: store
        })
      );
      //set dummy privileges to admin
      app.use("/", (req, res, next) => {
        req.session.cas_user = dummy.adminUser.HUID;
        req.session.user_accessLevel = "Admin";
        next();
      });
      app.use(UsersRouter);
      app.use(errorHandler);
      authAPI = supertest(app);
    });

    describe("GET", function() {
      describe("/current", function() {
        //create a fresh spy for each test run
        beforeEach(async function() {
          spy(User, "getOneByHUID");
          result = await authAPI.get("/current");
        });
        afterEach(function() {
          User.getOneByHUID.restore();
        });

        it("should call User.getOneByHUID()", function() {
          equal(User.getOneByHUID.called, true);
        });

        it("should return a 200 statusCode", function() {
          equal(result.statusCode, 200);
        });

        it("should return JSON", function() {
          equal(result.type, "application/json");
        });

        it("should return a user whose HUID matches the session user", function() {
          equal(result.body.HUID, dummy.adminUser.HUID);
        });
      });

      describe("/all", function() {
        beforeEach(async function() {
          spy(User, "getAll");
          result = await authAPI.get("/all");
        });

        afterEach(function() {
          User.getAll.restore();
        });
        it("should call User.getAll()", function() {
          equal(User.getAll.called, true);
        });

        it("should return a 200 statusCode", function() {
          equal(result.statusCode, 200);
        });

        it("should return JSON", function() {
          equal(result.type, "application/json");
        });
        it("should return an array of users", function() {
          equal(Array.isArray(result.body), true);
        });
      });

      describe("/:id", function() {
        beforeEach(async function() {
          spy(User, "getOneById");
          result = await authAPI.get("/" + data.regularUser.id);
        });

        afterEach(function() {
          User.getOneById.restore();
        });

        it("should call Filter.getOne()", function() {
          equal(User.getOneById.called, true);
        });

        it("should return a 200 statusCode", function() {
          equal(result.statusCode, 200);
        });

        it("should return JSON", function() {
          equal(result.type, "application/json");
        });

        it("Should return the correct user", function() {
          equal(result.body.HUID, dummy.regularUser.HUID);
        });
      });
    });

    describe("POST", function() {
      describe("/new", function() {
        beforeEach(function() {
          spy(User, "addNew");
        });
        afterEach(function() {
          User.addNew.restore();
        });
        context("With valid data", function() {
          beforeEach(async function() {
            result = await authAPI
              .post("/new")
              .set("Accept", "application/json")
              .send(dummy.newUser);
          });
          it("should call User.addNew()", function() {
            equal(User.addNew.called, true);
          });

          it("should return a 200 statusCode", function() {
            equal(result.statusCode, 200);
          });

          it("should return JSON", function() {
            equal(result.type, "application/json");
          });

          it("should return the user data", function() {
            equal(result.body.HUID, dummy.newUser.HUID);
          });
        });
        context("With invalid data", function() {
          beforeEach(async function() {
            result = await authAPI
              .post("/new")
              .set("Accept", "application/json")
              .send(dummy.brokenUser);
          });
          it("should call User.addNew()", function() {
            equal(User.addNew.called, true);
          });

          it("should return a 500 statusCode", function() {
            equal(result.statusCode, 500);
          });

          it("should return JSON", function() {
            equal(result.type, "application/json");
          });
          it("should contain an error message", function() {
            equal("error" in result.body, true);
          });
        });
      });
    });

    describe("PUT", function() {
      describe("/:id", function() {
        beforeEach(function() {
          spy(User.prototype, "update");
        });
        afterEach(function() {
          User.prototype.update.restore();
        });
        context("with valid data", function() {
          beforeEach(async function() {
            result = await authAPI
              .put("/" + data.regularUser.id)
              .set("Accept", "application/json")
              .send(dummy.newUser);
          });
          it("should call User.prototype.update()", function() {
            equal(User.prototype.update.called, true);
          });

          it("should return a 200 statusCode", function() {
            equal(result.statusCode, 200);
          });

          it("should return JSON", function() {
            equal(result.type, "application/json");
          });
          it("should return the new user data", function() {
            equal(result.body.id, data.regularUser.id);
            equal(result.body.HUID, dummy.newUser.HUID);
          });
        });
        context("with invalid data", function() {
          beforeEach(async function() {
            result = await authAPI
              .put("/" + data.regularUser.id)
              .set("Accept", "application/json")
              .send(dummy.brokenUser);
          });
          it("should call User.update()", function() {
            equal(User.prototype.update.called, true);
          });

          it("should return a 500 statusCode", function() {
            equal(result.statusCode, 500);
          });

          it("should return JSON", function() {
            equal(result.type, "application/json");
          });

          it("should contain an error message", function() {
            equal("error" in result.body, true);
          });
        });
      });
    });

    describe("DELETE", function() {
      describe("/:id", function() {
        beforeEach(async function() {
          spy(User.prototype, "delete");
          result = await authAPI
            .delete("/" + data.regularUser.id)
            .set("Accept", "application/json");
        });
        afterEach(function() {
          User.prototype.delete.restore();
        });
        it("should call User.delete", function() {
          equal(User.prototype.delete.called, true);
        });

        it("should return a 200 statusCode", function() {
          equal(result.statusCode, 200);
        });

        it("should return JSON", function() {
          equal(result.type, "application/json");
        });

        it("should include the deleted user", function() {
          equal(result.body.id, data.regularUser.id);
        });
      });
    });
  });
  context("Without Admin Permission", function() {
    before(function() {
      //create a fake express app
      //add basic middleware
      const anonapp = express();
      anonapp.use(bodyParser.json());
      //use express session for auth
      anonapp.use(
        session({
          resave: false,
          saveUninitialized: true,
          secret: "secret",
          store: store
        })
      );
      //set dummy privileges to admin
      anonapp.use("/", (req, res, next) => {
        req.session.cas_user = dummy.regularUser.HUID;
        req.session.user_accessLevel = "Read-Only";
        next();
      });
      anonapp.use(errorHandler);
      anonapp.use(UsersRouter);
      anonAPI = supertest(anonapp);
    });
    describe("GET", function() {
      describe("/current", function() {
        beforeEach(async function() {
          spy(User, "getOneByHUID");
          result = await anonAPI.get("/current");
        });
        afterEach(function() {
          User.getOneByHUID.restore();
        });

        it("should call User.getOneByHUID()", function() {
          equal(User.getOneByHUID.called, true);
        });

        it("should return a 200 statusCode", function() {
          equal(result.statusCode, 200);
        });

        it("should return JSON", function() {
          equal(result.type, "application/json");
        });

        it("should return a user whose HUID matches the session user", function() {
          equal(result.body.HUID, dummy.regularUser.HUID);
        });
      });
      describe("/all", function() {
        beforeEach(async function() {
          result = await anonAPI.get("/all");
        });
        it("Should return a 401 statusCode", function() {
          equal(result.statusCode, 401);
        });
        it("should send an error message", function() {
          equal("error" in result.body, true);
        });
      });
      describe("/:id", function() {
        beforeEach(async function() {
          result = await anonAPI.get(`/${data.regularUser.id}`);
        });
        it("Should return a 401 statusCode", function() {
          equal(result.statusCode, 401);
        });
        it("should send an error message", function() {
          equal("error" in result.body, true);
        });
      });
    });
    describe("POST", function() {
      describe("/new", function() {
        beforeEach(async function() {
          result = await anonAPI
            .post("/new")
            .accept("application/json")
            .send(dummy.newUser);
        });
        it("Should return a 401 statusCode", function() {
          equal(result.statusCode, 401);
        });
        it("should send an error message", function() {
          equal("error" in result.body, true);
        });
      });
    });
    describe("PUT", function() {
      describe("/:id", function() {
        beforeEach(async function() {
          result = await anonAPI
            .put(`/${data.regularUser.id}`)
            .accept("application/json")
            .send(dummy.newUser);
        });
        it("Should return a 401 statusCode", function() {
          equal(result.statusCode, 401);
        });
        it("should send an error message", function() {
          equal("error" in result.body, true);
        });
      });
    });
    describe("DELETE", function() {
      describe("/:id", function() {
        beforeEach(async function() {
          result = await anonAPI.delete(`/${data.regularUser.id}`);
        });
        it("Should return a 401 statusCode", function() {
          equal(result.statusCode, 401);
        });
        it("should send an error message", function() {
          equal("error" in result.body, true);
        });
      });
    });
  });
});
