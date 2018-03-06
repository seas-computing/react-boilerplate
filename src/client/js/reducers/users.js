/**
 * Redux User Reducer
 * @module client/reducers/users
 */

import * as ACTIONS from "../constants/ActionTypes";
export const initialState = {
  currentUser: {
    id: null,
    permission: null
  },
  allUsers: [],
  ajax: {
    user: false
  }
};

/**
 * User Reducer
 * @function users
 * @memberof module:client/reducers/users
 * @param  {Object} [state=initialState] The application state
 * @param  {Object} action               The action to take on the state
 * @return {Object}                      The resulting state
 */

export const users = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_PERMISSION_LEVEL: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          permission: action.permission
        }
      };
    }
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case ACTIONS.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.users
      };
    case ACTIONS.USER_UPDATED: {
      let newUsers = [...state.allUsers];
      let index = newUsers.findIndex(e => e.id === action.user.id);
      if (~index) {
        newUsers.splice(index, 1, action.user);
      }
      return {
        ...state,
        allUsers: newUsers,
        ajax: {
          ...state.ajax,
          user: false
        }
      };
    }
    case ACTIONS.USER_ADDED: {
      let newUsers = [...state.allUsers];
      newUsers.push(action.user);
      return {
        ...state,
        allUsers: newUsers,
        ajax: {
          ...state.ajax,
          user: false
        }
      };
    }
    case ACTIONS.USER_DELETED: {
      let newUsers = [...state.allUsers];
      let index = newUsers.findIndex(e => e.id === action.user.id);
      if (~index) {
        newUsers.splice(index, 1);
      }
      return {
        ...state,
        allUsers: newUsers,
        ajax: {
          ...state.ajax,
          user: false
        }
      };
    }
    case ACTIONS.USER_UPLOADING: {
      return {
        ...state,
        ajax: {
          ...state.ajax,
          user: true
        }
      };
    }
    default:
      return state;
  }
};
