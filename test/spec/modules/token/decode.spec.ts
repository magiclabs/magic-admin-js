import test from 'ava';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_DECODED } from '../../../lib/constants';

test('#01: Successfully decodes DIDT', async t => {
  const sdk = createMagicAdminSDK();
  const result = sdk.token.decode(VALID_DIDT);
  t.deepEqual(result, VALID_DIDT_DECODED);
});
