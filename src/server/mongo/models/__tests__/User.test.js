import { equal, fail } from "assert";
import { Mongoose } from "mongoose";
import * as dummy from "../../../../common/__tests__/data";
import {
  populate,
  depopulate
} from "../../../../common/__tests__/boilerplate/populateDatabase";
import { MONGO } from "../../../config";

describe("UserSchema", function() {
  let db;
  let data;
  let result;
  const mongoose = new Mongoose();
  before(async function() {
    db = await mongoose.createConnection(MONGO.URI);
  });
  beforeEach(async function() {
    data = await populate(db, { schemas: true });
  });
  afterEach(async function() {
    await depopulate(db);
  });
  after(async function() {
    await db.close();
  });
  describe("statics", function() {
    describe("addNew", function() {
      let newUser;
      beforeEach(async function() {
        newUser = {
          HUID: dummy.HUID,
          email: dummy.email,
          firstName: dummy.Person.firstName,
          lastName: dummy.Person.lastName
        };
        result = await db.model("User").addNew(newUser);
        await db.model("User").ensureIndexes();
      });
      it("should save a new user", async function() {
        let test = await db.model("User").getOneByHUID(dummy.HUID);
        equal(test.id, result.id);
      });
      it("should populate defaults", function() {
        equal(result.accessLevel, "Read-Only");
      });
      it("should respect the accessLevel enums", async function() {
        try {
          await db.model("User").addNew(dummy.brokenUser);
          fail("did not throw");
        } catch (err) {
          equal(err.message, "Error: Invalid permission provided.");
        }
      });
      it("Should not let you dupliate HUIDs", async function() {
        try {
          await db
            .model("User")
            .addNew({ ...newUser, firstName: dummy.string });
          fail("did not throw");
        } catch (err) {
          equal(err.message, `Error: That HUID is already in use.`);
        }
      });
    });

    describe("getAll", function() {
      beforeEach(async function() {
        result = await db.model("User").getAll();
      });
      it("Should return an array", function() {
        equal(Array.isArray(result), true);
      });
      it("should include all of the users", function() {
        equal(result.length, dummy.users.length);
      });
    });

    describe("getOneByID", function() {
      beforeEach(async function() {
        result = await db.model("User").getOneById(data.regularUser.id);
      });
      it("should return a single user", function() {
        equal(Array.isArray(result), false);
      });
      it("Should return the correct user", function() {
        equal(result.id, data.regularUser.id);
        equal(result.HUID, dummy.regularUser.HUID);
      });
    });

    describe("getOneByHUID", function() {
      beforeEach(async function() {
        result = await db.model("User").getOneByHUID(dummy.regularUser.HUID);
      });
      it("should return a single user", function() {
        equal(Array.isArray(result), false);
      });
      it("Should return the correct user", function() {
        equal(result.HUID, dummy.regularUser.HUID);
        equal(result.id, data.regularUser.id);
      });
    });
  });
  describe("methods", function() {
    describe("update", function() {
      beforeEach(async function() {
        await data.regularUser.update({ accessLevel: "Privileged" });
        result = await db.model("User").getOneById(data.regularUser.id);
      });
      it("Should keep the same id", function() {
        equal(result.id, data.regularUser.id);
      });
      it("Should update the field", function() {
        equal(result.accessLevel, "Privileged");
      });
      it("Should not change any other fields", function() {
        equal(result.HUID, data.regularUser.HUID);
        equal(result.email, data.regularUser.email);
        equal(result.lastName, data.regularUser.lastName);
        equal(result.firstName, data.regularUser.firstName);
      });
    });

    describe("delete", function() {
      beforeEach(async function() {
        await data.regularUser.delete();
      });
      it("Should delete the user", async function() {
        let test = await db.model("User").getOneById(data.regularUser.id);
        equal(test, null);
      });
    });
  });
});
