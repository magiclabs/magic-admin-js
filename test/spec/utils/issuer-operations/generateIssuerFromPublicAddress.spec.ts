import test from 'ava';
import { generateIssuerFromPublicAddress } from '../../../../src/utils/issuer-operations';

test('#01: Successfully builds issuer string from public address', async t => {
  const result = generateIssuerFromPublicAddress('0x1234');
  t.is(result, 'did:ethr:0x1234');
});
