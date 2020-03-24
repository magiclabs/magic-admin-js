import test from 'ava';
import { generateIssuerFromPublicAddress } from '../../../../src/utils/issuer';

test('#01: Successfully builds issuer string from public address', async t => {
  const result = generateIssuerFromPublicAddress('0x1234');
  t.is(result, 'did:ethr:0x1234');
});

test('#01: Successfully builds issuer string from public address with overrided method', async t => {
  const result = generateIssuerFromPublicAddress('0x1234', 'test');
  t.is(result, 'did:test:0x1234');
});
