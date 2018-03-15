/**
 * Redux Error Messsages
 * @module  client/actions/errors
 */

import * as types from "../constants/ActionTypes";

/**
 * Generate a generic error message action
 * @event  module:client/actions/errors.errorMessage
 * @param  {Error}  error  The Error object whose message should be displayed
 * @return  {Action}  Sets the error message
 */

export const errorMessage = error => ({
  type: types.ERROR_MESSAGE,
  message: error
});

/**
 * Clear the current message
 * @event  module:client/actions/errors.clearMessage
 * @return  {Action}  Clear the current message
 */

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE
});
