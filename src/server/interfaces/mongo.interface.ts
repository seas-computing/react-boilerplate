import { ConnectionOptions } from 'mongoose';

/**
 * Represents the connection details used by the MongooseModule
 */

export interface MongooseConnector {
  uri: string;
  options: ConnectionOptions;
}
