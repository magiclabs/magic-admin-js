import test from 'ava';
import { VALID_DIDT, VALID_DIDT_DECODED, INVALID_DIDT_MALFORMED_CLAIM } from '../../lib/constants';
import { MagicAdminSDKError, createMalformedTokenError } from '../../../src/core/sdk-exceptions';
import { parseDIDToken } from '../../../src/utils/parse-didt';

test('#01: Successfully parses DIDT', async t => {
  const result = parseDIDToken(VALID_DIDT);
  t.deepEqual(result.withParsedClaim, VALID_DIDT_DECODED);
});

test('#02: Throws error if token is malformed', async t => {
  const expectedError = createMalformedTokenError();
  const error: MagicAdminSDKError = t.throws(() => parseDIDToken(INVALID_DIDT_MALFORMED_CLAIM));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
