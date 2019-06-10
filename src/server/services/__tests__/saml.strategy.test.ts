import { Test, TestingModule } from '@nestjs/testing';
import { stub } from 'sinon';
import { regularUser } from 'common/__tests__/data';
import { deepStrictEqual, strictEqual } from 'assert';
import { HarvardKeyProfile } from 'server/interfaces';
import { UnauthorizedException } from '@nestjs/common';
import { SAMLStrategy } from '../saml.strategy';
import { ConfigService } from '../config.service';

describe('SAML Strategy', function () {
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

    const saml = module.get<SAMLStrategy>(SAMLStrategy);

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
    } as HarvardKeyProfile);

    deepStrictEqual(user, regularUser);
  });
  it('rejects failed auth attempts with an exception', async function () {
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

    const saml = module.get<SAMLStrategy>(SAMLStrategy);

    try {
      await saml.validate();
    } catch (error) {
      strictEqual(error instanceof UnauthorizedException, true);
    }
  });
});
