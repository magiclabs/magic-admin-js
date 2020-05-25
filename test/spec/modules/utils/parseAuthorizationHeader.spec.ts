import test from 'ava';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT } from '../../../lib/constants';
import { createExpectedBearerStringError, MagicAdminSDKError } from '../../../../src/core/sdk-exceptions';

test('#01: Successfully parses raw DIDT from `Bearer` authorization header', async t => {
  const sdk = createMagicAdminSDK();
  const result = sdk.utils.parseAuthorizationHeader(`Bearer ${VALID_DIDT}`);
  t.deepEqual(result, VALID_DIDT);
});

test('#02: Raises error if header is in the wrong format', async t => {
  const sdk = createMagicAdminSDK();
  const expectedError = createExpectedBearerStringError();
  const error: MagicAdminSDKError = t.throws(() => sdk.utils.parseAuthorizationHeader(`Ooops ${VALID_DIDT}`));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
