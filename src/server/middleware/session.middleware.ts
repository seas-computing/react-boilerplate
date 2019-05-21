import { Injectable } from '@nestjs/common';
import session from 'express-session';
import { SessionService, ConfigService } from '../services';

/**
 * Configures a session collection on MongoDB for storing user data
 * returned from Harvard Key. Session key will be stored in a cookie,
 * and used to retrieve the values.
 */

@Injectable()
class SessionMiddleware {
  public use: Function;

  public constructor(
    sessionService: SessionService,
    config: ConfigService
  ) {
    this.use = session({
      secret: config.get('SESSION_SECRET'),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: sessionService.store,
      resave: true,
      saveUninitialized: true,
    });
  }
}

export { SessionMiddleware };
