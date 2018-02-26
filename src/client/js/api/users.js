import request from "axios";

export const getAllUsers = async () => await request.get(`/api/users/all`);

export const addNewUser = async data =>
  await request.post(`/api/users/new`, data);

export const updateUser = async (id, data) =>
  await request.put(`/api/users/${id}`, data);

export const deleteUser = async id => await request.delete(`/api/users/${id}`);

export const getCurrentUser = async () =>
  await request.get(`/api/users/current`);
