import { Request } from 'express';
import session from 'express-session';
import connect from 'connect-mongodb-session';

/**
 *  representation of a express request object that includes our basic
 *  session data.
 */

export interface SessionRequest extends Request {
  session: {
    cas_user: string;
    authorizationFilterAttribute: boolean;
  };
}
const MongoDBStore = connect(session);

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_PORT,
  DB_DATABASE,
} = process.env;

const sessionStore = new MongoDBStore({
  uri: `mongodb://${DB_HOSTNAME}:${DB_PORT}`,
  connectionOptions: {
    useNewUrlParser: true,
    auth: {
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
  },
  collection: 'sessions',
  databaseName: DB_DATABASE,
}, (error: Error): void => { console.error(error); });

/**
 * configures a session collection on MongoDB for storing user data
 * returned from Harvard Key. Session key will be stored in a cookie,
 * and used to retrieve the values.
 */

export const sessionInit = session({
  secret: 'fill in a secret here',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
});
