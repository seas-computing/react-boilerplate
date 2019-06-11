import { Test, TestingModule } from '@nestjs/testing';
import { strictEqual } from 'assert';
import { safeString } from 'testData';
import { ConfigService } from '../config.service';

describe('Configuration Service', function () {
  it('reports if the app is in production', async function () {
    process.env.NODE_ENV = 'production';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
      ],
    }).compile();

    const config = module.get<ConfigService>(ConfigService);

    strictEqual(config.isProduction, true);
    strictEqual(config.isDevelopment, false);
  });

  it('reports if the app is in development', async function () {
    process.env.NODE_ENV = 'development';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
      ],
    }).compile();

    const config = module.get<ConfigService>(ConfigService);

    strictEqual(config.isProduction, false);
    strictEqual(config.isDevelopment, true);
  });

  it('provides access to arbitary environment variables', async function () {
    process.env.DB_HOSTNAME = safeString;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
      ],
    }).compile();

    const config = module.get<ConfigService>(ConfigService);

    strictEqual(config.get('DB_HOSTNAME'), safeString);
  });
});
