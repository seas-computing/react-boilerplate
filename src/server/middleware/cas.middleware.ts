/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import CASAuthentication from 'cas-authentication';
import { SessionRequest } from './session.middleware';

const {
  CAS_URL,
  NODE_ENV,
  EXTERNAL_URL,
} = process.env;


export const cas = new CASAuthentication({
  cas_version: '1.0',
  cas_url: CAS_URL,
  service_url: EXTERNAL_URL,
  is_dev_mode: NODE_ENV !== 'production',
  dev_mode_user: '88888888',
  dev_mode_info: {
    eduPersonAffiliation: ['member', 'employee'],
    eduPersonPrincipalName: '4d7ba4657ad211a2@harvard.edu',
    mail: 'help@seas.harvard.edu',
    sn: 'qa-user',
    givenName: ['QA'],
    displayName: 'QA User',
    authenticationType: 'PIN',
  },
  session_name: 'casUser',
  session_info: 'casUserinfo',
  destroy_session: NODE_ENV !== 'production',
});

/**
 * Uses the cas authentication library to authenticate the user, then saves the
 * user data in the request session. Authorization is being handled via grouper
 * but the available documentation is very vague about what will be returned by
 * it. Right now I'm using the name `authorizationFilterAttribute` as a stand
 * in, which will need to be replaced when we have the actual value.
 */

@Injectable()
class CASMiddleware implements NestMiddleware {
  public async use(
    req: SessionRequest, res: Response, next: Function
  ): Promise<void> {
    // If there is a CAS user and they are authorized, let them continue
    const {
      cas_user,
      authorizationFilterAttribute, // TODO: verify name of field
    } = req.session;
    if (NODE_ENV !== 'production') {
      req.session.cas_user = '88888888';
      req.session.authorizationFilterAttribute = true;
      next();
    } else {
      if (cas_user && authorizationFilterAttribute) {
        next();
      }
      if (!authorizationFilterAttribute) {
        res.status(403).send('You do not have access to this application').end();
        next();
      }
      res.status(401).send('This application requires HarvardKey').end();
    }
  }
}

export { CASMiddleware };
