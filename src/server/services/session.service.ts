import { Injectable } from '@nestjs/common';
import { MongoStore } from 'connect-mongo';

/**
 * Configure the express-session to connect to mongodb
 */

@Injectable()
class SessionService {
  public store: MongoStore;
}

export { SessionService };
