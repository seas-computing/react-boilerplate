/**
 * User Selectors
 * @module client/selectors/users
 */

import { createSelector } from "reselect";
/**
 * Returns the complete user list from the state
 * @method getUserList
 * @memberof module:client/selectors/users
 * @private
 * @param  {object}  state  Redux state
 * @return  {UserData[]}  A list of all users
 */
const getUserList = state => state.admin.allUsers;

/**
 * Returns the currently authenticated user's id
 * @method getUserList
 * @memberof module:client/selectors/users
 * @private
 * @param  {object}  state  Redux state
 * @return  {string}  the id for the current user
 */

const getCurrentUserId = state => state.admin.currentUser.id;

/**
 * Selected that returns the current user data
 * @memberof module:client/selectors/users
 * @method getThisUsersData
 * @param  {Object}  state  current redux state
 * @returns  {UserData}  The current user's data
 */

export const getThisUsersData = createSelector(
  [getUserList, getCurrentUserId],
  (all, one) => {
    let list = [...all];
    return list.find(e => e.id === one);
  }
);
/**
 * Selector that returns all users who are not the currently authenticated user
 * @memberof module:client/selectors/users
 * @method getAllOtherUsers
 * @param  {Object}  state  current redux state
 * @returns  {UserData[]}  A list of other users
 */
export const getAllOtherUsers = createSelector(
  [getUserList, getCurrentUserId],
  (all, one) => {
    let list = [...all];
    return list.filter(e => e.id !== one);
  }
);
