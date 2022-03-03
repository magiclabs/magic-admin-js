/* eslint-disable no-new */
import { MagicAdminSDK } from '../../../../src/index';
import { API_FULL_URL, API_KEY } from '../../../lib/constants';
import { TokenModule } from '../../../../src/modules/token';
import { UsersModule } from '../../../../src/modules/users';
import { UtilsModule } from '../../../../src/modules/utils';

test('#01: Initialize `MagicAdminSDK`', () => {
  const magic = new MagicAdminSDK(API_KEY);

  expect(magic.secretApiKey).toBe(API_KEY);
  expect(magic.apiBaseUrl).toBe(API_FULL_URL);
  expect(magic.token instanceof TokenModule).toBe(true);
  expect(magic.users instanceof UsersModule).toBe(true);
});

test('#02: Initialize `MagicAdminSDK` with custom endpoint', () => {
  const magic = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com' });

  expect(magic.secretApiKey).toBe(API_KEY);
  expect(magic.apiBaseUrl).toBe('https://example.com');
  expect(magic.token instanceof TokenModule).toBe(true);
  expect(magic.users instanceof UsersModule).toBe(true);
  expect(magic.utils instanceof UtilsModule).toBe(true);
});

test('#03: Strips trailing slash(es) from custom endpoint argument', () => {
  const magicA = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com/' });
  const magicB = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com//' });
  const magicC = new MagicAdminSDK(API_KEY, { endpoint: 'https://example.com///' });

  expect(magicA.apiBaseUrl).toBe('https://example.com');
  expect(magicB.apiBaseUrl).toBe('https://example.com');
  expect(magicC.apiBaseUrl).toBe('https://example.com');
});
