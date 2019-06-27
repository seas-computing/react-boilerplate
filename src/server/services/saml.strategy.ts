import { Strategy } from 'passport-saml';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HarvardKeyProfile } from '../interfaces';
import { User } from '../entities';
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

  public async validate(profile?: HarvardKeyProfile): Promise<User> {
    if (this.devMode) {
      const dummyUser: User = {
        eppn: 'abc123@harvard.edu',
        firstName: 'Test',
        lastName: 'User',
        email: 'noreply@seas.harvard.edu',
      };
      return dummyUser;
    }
    if (!profile) {
      throw new UnauthorizedException('You are not authorized to use this application. Please contact SEAS computing');
    }
    const authenticatedUser: User = {
      eppn: profile.eppn,
      firstName: profile.givenName,
      lastName: profile.sn,
      email: profile.email,
    };
    return authenticatedUser;
  }
}

export { SAMLStrategy };
