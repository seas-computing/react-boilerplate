import { Strategy } from 'passport-saml';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserData, HarvardKeyProfile } from '../interfaces';
import { ConfigService } from './config.service';

/**
 * Implements passport-saml to connect to Harvard Key for authentication
 */

@Injectable()
class SAMLStrategy extends PassportStrategy(Strategy) {
  private readonly devMode: boolean;

  public constructor(config: ConfigService) {
    super({
      entryPoint: config.get('CAS_URL'),
      issuer: 'passport-saml',
      host: config.get('EXTERNAL_URL'),
    });
    this.devMode = !config.isProduction;
  }

  public async validate(profile: HarvardKeyProfile): Promise<UserData> {
    if (this.devMode) {
      return {
        id: 'abc123',
        firstName: 'Test',
        lastName: 'User',
        email: 'noreply@seas.harvard.edu',
        displayName: 'testUser',
      };
    }
    if (!profile) {
      throw new UnauthorizedException();
    }
    return {
      id: profile.eppn,
      firstName: profile.givenName,
      lastName: profile.sn,
      email: profile.mail,
      displayName: profile.displayName,
    };
  }
}

export { SAMLStrategy };
