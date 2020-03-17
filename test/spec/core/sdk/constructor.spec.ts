/* eslint-disable no-new */

import test from 'ava';
import { MagicAdminSDK } from '../../../../src/core/sdk';
import { API_FULL_URL, API_KEY } from '../../../lib/constants';
import { TokenModule } from '../../../../src/modules/token';
import { UsersModule } from '../../../../src/modules/users';

test.serial('#01: Initialize `MagicAdminSDK`', t => {
  const magic = new MagicAdminSDK(API_KEY);

  t.is(magic.secretApiKey, API_KEY);
  t.is(magic.apiBaseUrl, API_FULL_URL);
  t.true(magic.token instanceof TokenModule);
  t.true(magic.users instanceof UsersModule);
});

test.serial('#02: Initialize `MagicAdminSDK` with custom endpoint', t => {
  const magic = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com' });

  t.is(magic.secretApiKey, API_KEY);
  t.is(magic.apiBaseUrl, 'https://example.com');
  t.true(magic.token instanceof TokenModule);
  t.true(magic.users instanceof UsersModule);
});

test.serial('#03: Strips trailing slash(es) from custom endpoint argument', t => {
  const magicA = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com/' });
  const magicB = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com//' });
  const magicC = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com///' });

  t.is(magicA.apiBaseUrl, 'https://example.com');
  t.is(magicB.apiBaseUrl, 'https://example.com');
  t.is(magicC.apiBaseUrl, 'https://example.com');
});
