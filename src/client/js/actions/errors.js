import * as types from "../constants/ActionTypes";

export const errorMessage = error => ({
  type: types.ERROR_MESSAGE,
  message: error
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE
});
