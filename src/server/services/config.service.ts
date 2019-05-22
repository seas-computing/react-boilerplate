import { MongooseModuleOptions } from '@nestjs/mongoose';

/**
 * Parses process.env to create a clean configuration interface
 */

class ConfigService {
  private readonly env: { [key: string]: string };

  public constructor() {
    this.env = { ...process.env };
  }

  /**
   * Return a single value from the environment
   */

  public get(key: string): string {
    return this.env[key];
  }

  /**
   * Return connection parameters for the Mongoose Module
   */

  public get mongooseOptions(): MongooseModuleOptions {
    const {
      DB_HOSTNAME,
      DB_PORT,
      DB_DATABASE,
      DB_USERNAME,
      DB_PASSWORD,
    } = this.env;
    return {
      uri: `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`,
      useNewUrlParser: true,
      user: DB_USERNAME,
      pass: DB_PASSWORD,
    };
  }

  /**
   * check if the app is currently running in production
   */

  public get isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  /**
   * check if the app is currently running in development mode
   */

  public get isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development';
  }
}

export { ConfigService };
