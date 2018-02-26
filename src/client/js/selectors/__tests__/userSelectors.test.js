import { equal, deepEqual } from "assert";
import * as selector from "../userSelectors";
import * as dummy from "../../../../common/__tests__/data";

describe("User Selectors", function() {
  let selected;
  let testState;
  let testStateCopy;
  const baseState = {
    admin: {
      allUsers: dummy.users,
      currentUser: {
        id: dummy.adminUser.id
      }
    }
  };
  const changedState = {
    admin: {
      ...baseState.admin,
      currentUser: {
        id: dummy.regularUser.id
      }
    }
  };
  describe("getThisUsersData", function() {
    beforeEach(function() {
      testState = { ...baseState };
      testStateCopy = { ...testState };
      selected = selector.getThisUsersData(testState);
    });
    it("should not mutate the state", function() {
      deepEqual(testState, testStateCopy);
    });
    it("should return populated User", function() {
      deepEqual(selected, dummy.adminUser);
    });
    it("should not recompute if the data doesn't change", function() {
      selector.getThisUsersData(testState);
      selector.getThisUsersData(testState);
      equal(selector.getThisUsersData.recomputations(), 1);
    });
    it("should recompute when the state changes", function() {
      selector.getThisUsersData(testState);
      selector.getThisUsersData(changedState);
      equal(selector.getThisUsersData.recomputations(), 2);
    });
  });
  describe("getAllOtherUsers", function() {
    beforeEach(function() {
      testState = { ...baseState };
      testStateCopy = { ...testState };
      selected = selector.getAllOtherUsers(testState);
    });
    it("should not mutate the state", function() {
      deepEqual(testState, testStateCopy);
    });
    it("should return all users except the current one", function() {
      equal(selected.length, dummy.users.length - 1);
      equal(selected.findIndex(e => e.id === dummy.adminUser.id), -1);
    });
    it("should not recompute if the data doesn't change", function() {
      selector.getAllOtherUsers(testState);
      selector.getAllOtherUsers(testState);
      equal(selector.getAllOtherUsers.recomputations(), 1);
    });
    it("should recompute when the state changes", function() {
      selector.getAllOtherUsers(testState);
      selector.getAllOtherUsers(changedState);
      equal(selector.getAllOtherUsers.recomputations(), 2);
    });
  });
});
