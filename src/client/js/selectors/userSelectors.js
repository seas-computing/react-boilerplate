import { createSelector } from "reselect";

const getUserList = state => state.admin.allUsers;
const getCurrentUserId = state => state.admin.currentUser.id;

export const getThisUsersData = createSelector(
  [getUserList, getCurrentUserId],
  (all, one) => {
    let list = [...all];
    return list.find(e => e.id === one);
  }
);

export const getAllOtherUsers = createSelector(
  [getUserList, getCurrentUserId],
  (all, one) => {
    let list = [...all];
    return list.filter(e => e.id !== one);
  }
);
