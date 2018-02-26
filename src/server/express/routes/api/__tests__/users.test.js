import supertest from "supertest";
import express from "express";
import assert from "assert";
import sinon from "sinon";
import bodyParser from "body-parser";
import { UsersRouter } from "../users";
import { connection } from "../../../../mongo";
import * as dummy from "../../../../../common/__tests__/data/index.js";

//TODO: Need to integrate session handling

describe.skip("UsersRouter", function() {
  let result;
  let testAPI;
  let sandbox;
  let User;
  before(() => {
    User = connection.model("User");
    sandbox = sinon.createSandbox();
    const app = express();
    app.use(bodyParser.json());
    app.use(UsersRouter);
    testAPI = supertest(app);
  });

  beforeEach(() => {
    sandbox.stub(User, "getAll").resolves(dummy.collection);
    sandbox.stub(User, "getOneByHUID").resolves(new User(dummy.object));
    sandbox.stub(User, "getOne").resolves(new User(dummy.object));
    sandbox.stub(User, "create").resolves(dummy.object);
    sandbox.stub(User, "update").resolves(dummy.newObject);
    sandbox.stub(User, "remove").resolves(dummy.object);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("GET", function() {
    describe("/current", function() {
      beforeEach(async function() {
        result = await testAPI.get("/current");
      });

      it("should call User.getOneByHUID()", function() {
        assert.equal(User.getOneByHUID.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });

    describe("/all", function() {
      beforeEach(async function() {
        result = await testAPI.get("/all");
      });

      it("should call User.getAll()", function() {
        assert.equal(User.getAll.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });

    describe("/:id", function() {
      beforeEach(async function() {
        result = await testAPI.get("/" + dummy.int);
      });

      it("should call Filter.getOne()", function() {
        assert.equal(User.getOne.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });
  });

  describe("POST", function() {
    describe("/new", function() {
      beforeEach(async function() {
        result = await testAPI
          .post("/new")
          .set("Accept", "application/json")
          .send(dummy.object);
      });
      it("should call User.create()", function() {
        assert.equal(User.create.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });

    describe("/id", function() {
      beforeEach(async function() {
        result = await testAPI
          .post("/" + dummy.int)
          .set("Accept", "application/json")
          .send(dummy.object);
      });
      it("should call User.update()", function() {
        assert.equal(User.update.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });
  });
  describe("DELETE", function() {
    describe("/:id", function() {
      beforeEach(async function() {
        result = await testAPI
          .delete("/" + dummy.int)
          .set("Accept", "application/json");
      });
      it("should call User.delete", function() {
        assert.equal(User.delete.called, true);
      });

      it("should return a 200 statusCode", function() {
        assert.equal(result.statusCode, 200);
      });

      it("should return JSON", function() {
        assert.equal(result.type, "application/json");
      });
    });
  });
});
