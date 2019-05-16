/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import CASAuthentication from 'cas-authentication';

const {
  CAS_URL,
  NODE_ENV,
  EXTERNAL_URL,
} = process.env;

export const cas = new CASAuthentication({
  cas_version: '1.0',
  cas_url: CAS_URL,
  service_url: EXTERNAL_URL,
  is_dev_mode: NODE_ENV !== 'production',
  dev_mode_user: '88888888',
  dev_mode_info: {
    eduPersonAffiliation: ['member', 'employee'],
    eduPersonPrincipalName: '4d7ba4657ad211a2@harvard.edu',
    mail: 'help@seas.harvard.edu',
    sn: 'qa-user',
    givenName: ['QA'],
    displayName: 'QA User',
    authenticationType: 'PIN',
  },
  session_name: 'casUser',
  session_info: 'casUserinfo',
  destroy_session: NODE_ENV !== 'production',
});
