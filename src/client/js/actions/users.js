import * as api from "../api";
import * as types from "../constants/ActionTypes";
import { errorMessage } from "./errors";

export const setAllUsers = users => ({
  type: types.SET_ALL_USERS,
  users
});

export const userAdded = user => ({
  type: types.USER_ADDED,
  user
});

export const userUpdated = user => ({
  type: types.USER_UPDATED,
  user
});

export const userDeleted = user => ({
  type: types.USER_DELETED,
  user
});

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

export const saveNewUser = user => async dispatch => {
  try {
    let result = await api.addNewUser(user);
    dispatch(userAdded(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

export const updateUser = user => async dispatch => {
  try {
    let result = await api.updateUser(user.id, user);
    dispatch(userUpdated(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

export const fetchAllUsers = () => async dispatch => {
  try {
    let result = await api.getAllUsers();
    dispatch(setAllUsers(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

export const fetchCurrentUser = () => async dispatch => {
  try {
    let result = await api.getCurrentUser();
    let user = result.data;
    dispatch(setCurrentUser({ id: user.id, permission: user.accessLevel }));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    let result = await api.deleteUser(userId);
    dispatch(userDeleted(result.data));
  } catch (err) {
    dispatch(errorMessage(err));
  }
};
