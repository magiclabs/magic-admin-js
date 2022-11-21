import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';

test('Successfully gets public address from DIDT', () => {
  const sdk = createMagicAdminSDK();
  const result = sdk.token.getPublicAddress(VALID_DIDT);
  const expected = VALID_DIDT_PARSED_CLAIMS.iss.split(':')[2];
  expect(result).toBe(expected);
});
