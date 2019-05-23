import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import session from 'express-session';
import connect, { MongoStore } from 'connect-mongo';

/**
 * Configure the express-session to connect to mongodb
 */

@Injectable()
class SessionService {
  public store: MongoStore;

  public constructor(@InjectConnection() mongoConnection: Connection) {
    this.store = new (connect(session))({
      mongooseConnection: mongoConnection,
    });
  }
}

export { SessionService };
