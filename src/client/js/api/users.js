/**
 * Send requests to server and return resolved reponses
 * @module  client/api/users
 */

import request from "axios";

/**
 * Get all of the users
 * @async
 * @function  getAllUsers
 * @memberof  module:client/api/users
 * @return  {Promise<UserData[]>}  Resolves to a list of all users
 */

export const getAllUsers = async () => await request.get(`/api/users/all`);

/**
 * Add a new user
 * @async
 * @function  addNewUser
 * @memberof  module:client/api/users
 * @param  {UserData}  data Person to add
 * @return  {Promise<UserData>}  Resolves to the new user data
 */

export const addNewUser = async data =>
  await request.post(`/api/users/new`, data);

/**
 * Update a user
 * @method  updateUser
 * @param  {String}  id  Mongo id for the user
 * @param  {UserData}  data  Update for the user
 * @return  {Promise<UserData>}  Resolves to the updated user
 */

export const updateUser = async (id, data) =>
  await request.put(`/api/users/${id}`, data);

/**
 * Delete a user
 * @method  deleteUser
 * @memberof  module:client/api/users
 * @param  {String}  id  Mongo id of the user to delete
 * @return  {Promise<UserData>}  Resolves to the data of the user just deleted
 */

export const deleteUser = async id => await request.delete(`/api/users/${id}`);

/**
 * Get the currently authenticated user
 * @async
 * @function  getCurrentUser
 * @memberof  module:client/api/users
 * @return  {Promise<UserData>}  Resolves to the data of the currently authenticated user
 */

export const getCurrentUser = async () =>
  await request.get(`/api/users/current`);
