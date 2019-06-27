/**
 * @module Server.Entities
 */

/**
 * Basic user representing the format of user data within this application.
 *
 */
export class User {
  /**
   * Unique ID representing a user.
   *
   * See [[HarvardKeyProfile.eppn]] for more information
   */
  public eppn: string;

  /**
   * User's first name
   * @example James
   */
  public firstName: string;

  /**
   * User's Last name
   * @example Waldo
   */
  public lastName: string;

  /**
   * User's email address
   * @example waldo@harvard.edu
   */
  public email: string;
}
