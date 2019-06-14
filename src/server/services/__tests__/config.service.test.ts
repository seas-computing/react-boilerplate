import { strictEqual } from 'assert';
import { safeString, int } from 'testData';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '../config.service';

describe('Configuration Service', function () {
  it('reports if the app is in production', function () {
    const config = new ConfigService({
      NODE_ENV: 'production',
    });

    strictEqual(config.isProduction, true);
    strictEqual(config.isDevelopment, false);
  });

  it('reports if the app is in development', function () {
    const config = new ConfigService({
      NODE_ENV: 'development',
    });

    strictEqual(config.isProduction, false);
    strictEqual(config.isDevelopment, true);
  });

  it('provides access to arbitary environment variables', function () {
    const config = new ConfigService({
      DB_HOSTNAME: safeString,
    });

    strictEqual(config.get('DB_HOSTNAME'), safeString);
  });

  describe('mongoose options', function () {
    const DB_HOSTNAME = 'hostname';
    const DB_PORT = int.toString();
    const DB_DATABASE = 'database';
    const DB_USERNAME = 'username';
    const DB_PASSWORD = 'password';

    let mongooseOptions: MongooseModuleOptions;

    beforeEach(function () {
      const config = new ConfigService({
        DB_HOSTNAME,
        DB_PORT,
        DB_DATABASE,
        DB_USERNAME,
        DB_PASSWORD,
      });
      ({ mongooseOptions } = config);
    });

    it('creates a URI connection string from environment vars', function () {
      strictEqual(
        mongooseOptions.uri,
        `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`
      );
    });

    it('provides the mongo username', function () {
      strictEqual(mongooseOptions.user, DB_USERNAME);
    });

    it('provides the mongo password', function () {
      strictEqual(mongooseOptions.pass, DB_PASSWORD);
    });
  });
});
