import { equal, deepEqual } from "assert";
import { stub } from "sinon";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../users";
import * as userApi from "../../api/users";
import * as types from "../../constants/ActionTypes";
import * as dummy from "../../../../common/__tests__/data";

describe("User Actions", function() {
  let action;
  describe("Synchronous actions", function() {
    describe("userAdded", function() {
      beforeEach(function() {
        action = actions.userAdded(dummy.regularUser);
      });
      it("should be of type USER_ADDED", function() {
        equal(action.type, types.USER_ADDED);
      });
      it("should include the user", function() {
        equal(action.user, dummy.regularUser);
      });
    });
    describe("userUpdated", function() {
      beforeEach(function() {
        action = actions.userUpdated(dummy.regularUser);
      });
      it("should be of type USER_UPDATED", function() {
        equal(action.type, types.USER_UPDATED);
      });
      it("should include the user", function() {
        equal(action.user, dummy.regularUser);
      });
    });
    describe("setAllUsers", function() {
      beforeEach(function() {
        action = actions.setAllUsers(dummy.users);
      });
      it("should be of type SET_ALL_USERS", function() {
        equal(action.type, types.SET_ALL_USERS);
      });
      it("should include the users", function() {
        equal(action.users, dummy.users);
      });
    });
    describe("userDeleted", function() {
      beforeEach(function() {
        action = actions.userDeleted(dummy.regularUser);
      });
      it("should be of type USER_DELETED", function() {
        equal(action.type, types.USER_DELETED);
      });
      it("should include the user id", function() {
        deepEqual(action.user, dummy.regularUser);
      });
    });
    describe("setCurrentUser", function() {
      beforeEach(function() {
        action = actions.setCurrentUser(dummy.User);
      });
      it("should be of type SET_CURRENT_USER", function() {
        equal(action.type, types.SET_CURRENT_USER);
      });
      it("should include the user id", function() {
        deepEqual(action.user, dummy.User);
      });
    });
    describe("userUploading", function() {
      beforeEach(function() {
        action = actions.userUploading();
      });
      it("should be of type USER_UPLOADING", function() {
        equal(action.type, types.USER_UPLOADING);
      });
    });
    describe("userUploadingFailed", function() {
      beforeEach(function() {
        action = actions.userUploadingFailed();
      });
      it("should be of type USER_UPLOADING_FAILED", function() {
        equal(action.type, types.USER_UPLOADING_FAILED);
      });
    });
  });

  describe("Asynchronous actions", function() {
    let store;
    let mockStore;
    before(function() {
      mockStore = configureStore([thunk]);
    });
    beforeEach(function() {
      store = mockStore({});
    });
    describe("saveNewUser", function() {
      let mockCall;
      beforeEach(function() {
        mockCall = stub(userApi, "addNewUser");
      });
      afterEach(function() {
        mockCall.restore();
      });
      describe("When api call succeeds", function() {
        beforeEach(async function() {
          mockCall.resolves({
            data: dummy.regularUser
          });
          await store.dispatch(actions.saveNewUser(dummy.regularUser));
        });
        it("Should call api.saveNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the newUser action second", function() {
          let expected = {
            type: types.USER_ADDED,
            user: dummy.regularUser
          };
          deepEqual(store.getActions()[1], expected);
        });
      });
      describe("When api call fails", function() {
        beforeEach(async function() {
          mockCall.rejects();
          await store.dispatch(actions.saveNewUser(dummy.regularUser));
        });
        it("Should call api.addNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the userUploadingFailed action second", function() {
          let expected = {
            type: types.USER_UPLOADING_FAILED
          };
          deepEqual(store.getActions()[1], expected);
        });
        it("Should dispatch an errorMessage third", function() {
          let expected = {
            type: types.ERROR_MESSAGE,
            message: new Error("Error")
          };
          deepEqual(store.getActions()[2], expected);
        });
      });
    });
    describe("updateUser", function() {
      let mockCall;
      beforeEach(function() {
        mockCall = stub(userApi, "updateUser");
      });
      afterEach(function() {
        mockCall.restore();
      });
      describe("When api call succeeds", function() {
        beforeEach(async function() {
          mockCall.resolves({
            data: dummy.regularUser
          });
          await store.dispatch(actions.updateUser(dummy.regularUser));
        });
        it("Should call api.updateUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the userUpdated action second", function() {
          let expected = {
            type: types.USER_UPDATED,
            user: dummy.regularUser
          };
          deepEqual(store.getActions()[1], expected);
        });
      });
      describe("When api call fails", function() {
        beforeEach(async function() {
          mockCall.rejects();
          await store.dispatch(actions.updateUser(dummy.regularUser));
        });
        it("Should call api.addNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the userUploadingFailed action second", function() {
          let expected = {
            type: types.USER_UPLOADING_FAILED
          };
          deepEqual(store.getActions()[1], expected);
        });
        it("Should dispatch an errorMessage third", function() {
          let expected = {
            type: types.ERROR_MESSAGE,
            message: new Error("Error")
          };
          deepEqual(store.getActions()[2], expected);
        });
      });
    });
    describe("fetchAllUsers", function() {
      let mockCall;
      beforeEach(function() {
        mockCall = stub(userApi, "getAllUsers");
      });
      afterEach(function() {
        mockCall.restore();
      });
      describe("When api call succeeds", function() {
        beforeEach(async function() {
          mockCall.resolves({
            data: dummy.users
          });
          await store.dispatch(actions.fetchAllUsers());
        });
        it("Should call api.fetchAllUsers", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the setAllUsers action", function() {
          let expected = {
            type: types.SET_ALL_USERS,
            users: dummy.users
          };
          deepEqual(store.getActions(), [expected]);
        });
      });
      describe("When api call fails", function() {
        beforeEach(async function() {
          mockCall.rejects();
          await store.dispatch(actions.fetchAllUsers(dummy.regularUser));
        });
        it("Should call api.addNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch an errorMessage", function() {
          let expected = {
            type: types.ERROR_MESSAGE,
            message: new Error("Error")
          };
          deepEqual(store.getActions(), [expected]);
        });
      });
    });
    describe("fetchCurrentUser", function() {
      let mockCall;
      beforeEach(function() {
        mockCall = stub(userApi, "getCurrentUser");
      });
      afterEach(function() {
        mockCall.restore();
      });
      describe("When api call succeeds", function() {
        beforeEach(async function() {
          mockCall.resolves({
            data: dummy.regularUser
          });
          await store.dispatch(actions.fetchCurrentUser());
        });
        it("Should call api.fetchCurrentUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the newUser action", function() {
          let expected = {
            type: types.SET_CURRENT_USER,
            user: {
              id: dummy.regularUser.id,
              permission: dummy.regularUser.accessLevel
            }
          };
          deepEqual(store.getActions(), [expected]);
        });
      });
      describe("When api call fails", function() {
        beforeEach(async function() {
          mockCall.rejects();
          await store.dispatch(actions.fetchCurrentUser());
        });
        it("Should call api.addNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch an errorMessage", function() {
          let expected = {
            type: types.ERROR_MESSAGE,
            message: new Error("Error")
          };
          deepEqual(store.getActions(), [expected]);
        });
      });
    });
    describe("deleteUser", function() {
      let mockCall;
      beforeEach(function() {
        mockCall = stub(userApi, "deleteUser");
      });
      afterEach(function() {
        mockCall.restore();
      });
      describe("When api call succeeds", function() {
        beforeEach(async function() {
          mockCall.resolves({
            data: dummy.regularUser
          });
          await store.dispatch(actions.deleteUser(dummy.regularUser.id));
        });
        it("Should call api.deleteUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the newUser action", function() {
          let expected = {
            type: types.USER_DELETED,
            user: dummy.regularUser
          };
          deepEqual(store.getActions()[1], expected);
        });
      });
      describe("When api call fails", function() {
        beforeEach(async function() {
          mockCall.rejects();
          await store.dispatch(actions.deleteUser(dummy.regularUser.id));
        });
        it("Should call api.addNewUser", function() {
          equal(mockCall.called, true);
          equal(mockCall.callCount, 1);
        });
        it("Should dispatch the userUploading action first", function() {
          let expected = {
            type: types.USER_UPLOADING
          };
          deepEqual(store.getActions()[0], expected);
        });
        it("Should dispatch the userUploadingFailed action second", function() {
          let expected = {
            type: types.USER_UPLOADING_FAILED
          };
          deepEqual(store.getActions()[1], expected);
        });
        it("Should dispatch an errorMessage third", function() {
          let expected = {
            type: types.ERROR_MESSAGE,
            message: new Error("Error")
          };
          deepEqual(store.getActions()[2], expected);
        });
      });
    });
  });
});
