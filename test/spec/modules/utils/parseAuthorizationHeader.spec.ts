import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT } from '../../../lib/constants';
import { createExpectedBearerStringError } from '../../../../src/core/sdk-exceptions';

test('#01: Successfully parses raw DIDT from `Bearer` authorization header', async () => {
  const sdk = createMagicAdminSDK();
  const result = sdk.utils.parseAuthorizationHeader(`Bearer ${VALID_DIDT}`);
  expect(result).toEqual(VALID_DIDT);
});

test('#02: Raises error if header is in the wrong format', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createExpectedBearerStringError();
  expect(() => sdk.utils.parseAuthorizationHeader(`Ooops ${VALID_DIDT}`)).toThrow(expectedError);
});
