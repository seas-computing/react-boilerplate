import { HarvardKeyProfile } from '../interfaces';

/**
 * Basic user object
 */

export class User {
  public readonly id: string;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly email: string;

  /**
   * create a new user from an object
   */
  public constructor(data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }

  /**
   * Create a user from the profile data returned by SAML
   */

  public static fromProfile(data: HarvardKeyProfile): User {
    return new User({
      id: data.eppn,
      firstName: data.givenName,
      lastName: data.sn,
      email: data.email,
    });
  }

  /**
   * Get the user's name as firstName lastName
   */

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Get the user's name as lastName, firstName
   */

  public get listName(): string {
    return `${this.lastName}, ${this.firstName}`;
  }
}
