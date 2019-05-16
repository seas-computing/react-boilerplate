import { combineReducers } from 'redux';
import { users } from './users';

const rootReducer = combineReducers({
  users,
});

export default rootReducer;
/**
 * Redux User Reducer
 * @module  client/reducers/users
 * @see  module:client/actions/users
 */

import * as ACTIONS from '../constants/ActionTypes';

/**
 * Initial User State
 * @memberof  module:client/reducers/users
 * @const
 * @property  {UserData[]}  allUsers  A list of all users in the system
 * @property  {Boolean}  ajax  Flag indicating that an asynchronous request is in progress
 * @property  {Object}  currentUser  details about the currently authenticated user
 * @property  {String}  currentUser.id  currently authenticated user's id
 * @property  {AccessLevel}  currentUser.permission  currently authenticated user's permission level
 */

export const initialState = {
  currentUser: {
    id: null,
    permission: null,
  },
  allUsers: [],
  ajax: false,
};

/**
 * User Reducer
 * @function  users
 * @memberof  module:client/reducers/users
 * @param  {Object}  [state=initialState]  The application state
 * @param  {Object}  action  The action to take on the state
 * @return  {Object}  The resulting state
 * @listens  module:client/actions/users.setAllUsers
 * @listens  module:client/actions/users.setCurrentUser
 * @listens  module:client/actions/users.userUpdated
 * @listens  module:client/actions/users.userAdded
 * @listens  module:client/actions/users.userDeleted
 * @listens  module:client/actions/users.userUploading
 */

export const users = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case ACTIONS.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users,
      };
    case ACTIONS.USER_UPDATED: {
      const newUsers = [...state.allUsers];
      const index = newUsers.findIndex((e) => e.id === action.user.id);
      if (index !== -1) {
        newUsers.splice(index, 1, action.user);
      }
      return {
        ...state,
        allUsers: newUsers,
        ajax: false,
      };
    }
    case ACTIONS.USER_ADDED: {
      const newUsers = [...state.allUsers];
      newUsers.push(action.user);
      return {
        ...state,
        allUsers: newUsers,
        ajax: false,
      };
    }
    case ACTIONS.USER_DELETED: {
      const newUsers = [...state.allUsers];
      const index = newUsers.findIndex((e) => e.id === action.user.id);
      if (index !== -1) {
        newUsers.splice(index, 1);
      }
      return {
        ...state,
        allUsers: newUsers,
        ajax: false,
      };
    }
    case ACTIONS.USER_UPLOADING: {
      return {
        ...state,
        ajax: true,
      };
    }
    case ACTIONS.USER_UPLOADING_FAILED: {
      return {
        ...state,
        ajax: false,
      };
    }
    default:
      return state;
  }
};
