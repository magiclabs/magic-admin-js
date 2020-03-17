import test from 'ava';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_DECODED, INVALID_DIDT_MALFORMED_CLAIM } from '../../../lib/constants';
import { MagicAdminSDKError, createMalformedTokenError } from '../../../../src/core/sdk-exceptions';

test('#01: Successfully decodes DIDT', async t => {
  const sdk = createMagicAdminSDK();
  const result = sdk.token.decode(VALID_DIDT);
  t.deepEqual(result, VALID_DIDT_DECODED);
});

test('#02: Throws error if token is malformed', async t => {
  const sdk = createMagicAdminSDK();
  const expectedError = createMalformedTokenError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.decode(INVALID_DIDT_MALFORMED_CLAIM));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
