/**
 * @apiDefine  ExpressError
 *
 * @apiError  (500)  Error Generic error from express
 *
 * @apiErrorExample  Express Error
 * HTTP1.1/500 Error
 * {
 *  "error": "Error message"
 * }
 */

/**
 * @apiDefine PermissionError
 *
 * @apiError  (401)  UnauthorizedError  User lacks permission
 *
 * @apiErrorExample  Permission Error
 * HTTP1.1/401 Error
 * {
 *  "error": "Only Admin users can update"
 * }
 */

/**
 * @apiDefine  Admin Current user's accessLevel must be "Admin"
 */
/**
 * @apiDefine  Privileged Current user's accessLevel must be at least "Privileged"
 */
/**
 * @apiDefine  ReadOnly Current user's accessLevel must be at least "Read-Only"
 */
/**
 * @apiDefine  None Route does not require authorization
 */

import * as appRoutes from "./app";
import * as apiRoutes from "./api";

export const app = appRoutes;
export const api = apiRoutes;
