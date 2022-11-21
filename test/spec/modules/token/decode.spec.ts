import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_DECODED, INVALID_DIDT_MALFORMED_CLAIM } from '../../../lib/constants';
import { createMalformedTokenError } from '../../../../src/core/sdk-exceptions';

test('Successfully decodes DIDT', async () => {
  const sdk = createMagicAdminSDK();
  const result = sdk.token.decode(VALID_DIDT);
  expect(result).toEqual(VALID_DIDT_DECODED);
});

test('Throws error if token is malformed', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createMalformedTokenError();
  expect(() => sdk.token.decode(INVALID_DIDT_MALFORMED_CLAIM)).toThrow(expectedError);
});
