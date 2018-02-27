import { equal, deepEqual } from "assert";
import { initialState, users } from "../users";
import * as ACTIONS from "../../constants/ActionTypes";
import * as dummy from "../../../../common/__tests__/data";

describe("Users Reducer", function() {
  let state;
  describe("initialState", function() {
    beforeEach(function() {
      state = users(undefined, {});
    });
    it("Should initialize with the correct state", function() {
      deepEqual(state, initialState);
    });
  });
  describe("Actions", function() {
    let testState;
    let testStateCopy;
    describe("With Empty State", function() {
      beforeEach(function() {
        testState = { ...initialState };
        testStateCopy = { ...testState };
      });
      describe("SET_PERMISSION_LEVEL", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.SET_PERMISSION_LEVEL,
            permission: dummy.adminUser.permission
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("Should set the permission level", function() {
          equal(state.currentUser.permission, dummy.adminUser.permission);
        });
      });
      describe("SET_CURRENT_USER", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.SET_CURRENT_USER,
            user: dummy.webUser
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("should set the current user", function() {
          deepEqual(state.currentUser, dummy.webUser);
        });
      });
      describe("SET_ALL_USERS", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.SET_ALL_USERS,
            users: dummy.users
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("should populate the users array", function() {
          equal(state.allUsers, dummy.users);
        });
      });
      describe("USER_ADDED", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.USER_ADDED,
            user: dummy.webUser
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("Should add the user to the end of the list", function() {
          equal(state.allUsers[state.allUsers.length - 1], dummy.webUser);
        });
      });
    });
    describe("With Users Populated", function() {
      beforeEach(function() {
        testState = {
          ...initialState,
          allUsers: dummy.users
        };
        testStateCopy = { ...testState };
      });
      describe("USER_UPDATED", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.USER_UPDATED,
            user: { ...dummy.regularUser, name: dummy.string }
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("Should replace the user in the list", function() {
          equal(state.allUsers.length, dummy.users.length);
          equal(
            state.allUsers.find(e => e.id === dummy.regularUser.id).name,
            dummy.string
          );
        });
      });
      describe("USER_DELETED", function() {
        beforeEach(function() {
          state = users(testState, {
            type: ACTIONS.USER_DELETED,
            user: dummy.regularUser
          });
        });
        it("Should not mutate the state", function() {
          deepEqual(testState, testStateCopy);
        });
        it("Should delete the user from the list", function() {
          equal(state.allUsers.length, dummy.users.length - 1);
          equal(state.allUsers.includes(dummy.regularUser), false);
        });
      });
    });
  });
});
