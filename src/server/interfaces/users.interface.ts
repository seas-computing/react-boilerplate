/**
 * Represents a single user, integrating fields from the SAML response
 */


export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
}
