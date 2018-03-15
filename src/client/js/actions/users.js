/**
 * Redux User Actions
 * @module  client/actions/users
 * @see  module:client/reducers/users
 */

import * as api from "../api";
import * as types from "../constants/ActionTypes";
import { errorMessage } from "./errors";

/**
 * Generate an action to fill in a list of all users
 * @event  module:client/actions/users.setAllUsers
 * @memberof  module:client/actions/users
 * @param  {UserData[]}  users  An array of all users in the system
 * @return  {Action}  Action to populate the user list
 */

export const setAllUsers = users => ({
  type: types.SET_ALL_USERS,
  users
});

/**
 * Generate an action to add a user to the list
 * @event  module:client/actions/users.userAdded
 * @memberof  module:client/actions/users
 * @param  {UserData}  user  User to be added
 * @return  {Action} Action to add the user
 */

export const userAdded = user => ({
  type: types.USER_ADDED,
  user
});

/**
 * Generate an action to update a user in the list
 * @event  module:client/actions/users.userUpdated
 * @memberof  module:client/actions/users
 * @param  {UserData}  user  user to be replaced
 * @return  {Action}  Action to replace the updated user
 */ Action;

export const userUpdated = user => ({
  type: types.USER_UPDATED,
  user
});

/**
 * Generates an action to delete a user from the list
 * @event  module:client/actions/users.userDeleted
 * @memberof  module:client/actions/users
 * @param  {UserData}    user  user to remove
 * @return  {Action}  Action to remove the user
 */

export const userDeleted = user => ({
  type: types.USER_DELETED,
  user
});

/**
 * Generates an action to set the current user
 * @event  module:client/actions/users.setCurrentUser
 * @memberof  module:client/actions/users
 * @param  {UserData}  user  current user
 * @return  {Action}  Action to set the current user
 */
export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

/**
 * Generates an action to flag the user as uploading
 * @event  module:client/actions/users.userUploading
 * @memberof  module:client/actions/users
 * @return  {Action}  Action to set the ajax flag
 */
export const userUploading = user => ({
  type: types.USER_UPLOADING
});

/**
 * Push a new user to the server and dispatch an action
 * @async
 * @function  saveNewUser
 * @memberof  module:client/actions/users
 * @param  {UserData}  user  The userdata to send to the server
 * @fires  module:client/actions/users.userAdded
 * @fires  module:client/actions/users.userUploading
 * @fires  module:client/actions/errors.errorMessage
 */

export const saveNewUser = user => async dispatch => {
  try {
    dispatch(userUploading());
    let result = await api.addNewUser(user);
    dispatch(userAdded(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

/**
 * Update a user on the server and dispatch an action
 * @async
 * @function  updateUser
 * @memberof  module:client/actions/users
 * @param  {UserData}  user  The userdata to send to the server
 * @fires  module:client/actions/users.userUpdated
 * @fires  module:client/actions/users.userUploading
 * @fires  module:client/actions/errors.errorMessage
 */

export const updateUser = user => async dispatch => {
  try {
    dispatch(userUploading());
    let result = await api.updateUser(user.id, user);
    dispatch(userUpdated(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

/**
 * Get a complete list of users from the server and dispatch an action
 * @async
 * @function  fetchAllUsers
 * @memberof  module:client/actions/users
 * @fires  module:client/actions/users.setAllUsers
 * @fires  module:client/actions/errors.errorMessage
 */

export const fetchAllUsers = () => async dispatch => {
  try {
    let result = await api.getAllUsers();
    dispatch(setAllUsers(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

/**
 * Get the currently authenticated user from the server and dispatch an action
 * @async
 * @function  fetchCurrentUser
 * @memberof  module:client/actions/users
 * @fires  module:client/actions/users.setCurrentUser
 * @fires  module:client/actions/errors.errorMessage
 */

export const fetchCurrentUser = () => async dispatch => {
  try {
    let result = await api.getCurrentUser();
    let user = result.data;
    dispatch(setCurrentUser({ id: user.id, permission: user.accessLevel }));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

/**
 * Get the currently authenticated user from the server and dispatch an action
 * @async
 * @function  deleteUser
 * @memberof  module:client/actions/users
 * @param  {String}  userId  mongo Id for the user to be deleted
 * @fires  module:client/actions/users.userDeleted
 * @fires  module:client/actions/users.userUploading
 * @fires  module:client/actions/errors.errorMessage
 */

export const deleteUser = userId => async dispatch => {
  try {
    dispatch(userUploading());
    let result = await api.deleteUser(userId);
    dispatch(userDeleted(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};
