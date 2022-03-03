import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';

test('#01: Successfully gets issuer from DIDT', () => {
  const sdk = createMagicAdminSDK();
  const result = sdk.token.getIssuer(VALID_DIDT);
  const expected = VALID_DIDT_PARSED_CLAIMS.iss;
  expect(result).toBe(expected);
});
