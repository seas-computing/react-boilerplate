import { Profile } from 'passport-saml';

/**
 * Models data returned by the Harvard Key SAML request
 */

export interface HarvardKeyProfile extends Profile {
  eppn: string;
  givenName: string;
  sn: string;
  displayName: string;
}
