import { strictEqual } from 'assert';
import { safeString } from 'testData';
import { ConfigService } from '../config.service';

describe('Configuration Service', function () {
  it('reports if the app is in production', async function () {
    const config = new ConfigService({
      NODE_ENV: 'production',
    });

    strictEqual(config.isProduction, true);
    strictEqual(config.isDevelopment, false);
  });

  it('reports if the app is in development', async function () {
    const config = new ConfigService({
      NODE_ENV: 'development',
    });

    strictEqual(config.isProduction, false);
    strictEqual(config.isDevelopment, true);
  });

  it('provides access to arbitary environment variables', async function () {
    const config = new ConfigService({
      DB_HOSTNAME: safeString,
    });

    strictEqual(config.get('DB_HOSTNAME'), safeString);
  });
});
