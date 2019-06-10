import { Test, TestingModule } from '@nestjs/testing';
import { stub } from 'sinon';
import { regularUser } from 'common/__tests__/data';
import { deepStrictEqual } from 'assert';
import { SAMLStrategy } from '../saml.strategy';
import { ConfigService } from '../config.service';

describe('SAML Strategy', function () {
  let saml: SAMLStrategy;

  const config = {
    isProduction: null,
    get: stub(),
  };

  afterEach(function () {
    config.get.resetHistory();
  });

  it('re-maps harvard key user info to a user object', async function () {
    config.isProduction = true;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: config,
        },
        SAMLStrategy,
      ],
    }).compile();

    saml = module.get<SAMLStrategy>(SAMLStrategy);

    const {
      id,
      lastName,
      firstName,
      email,
    } = regularUser;

    const user = await saml.validate({
      eppn: id,
      givenName: firstName,
      sn: lastName,
      email,
    } as any);

    deepStrictEqual(user, regularUser);
  });
});
