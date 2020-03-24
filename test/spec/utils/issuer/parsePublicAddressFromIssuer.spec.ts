import test from 'ava';
import { parsePublicAddressFromIssuer } from '../../../../src/utils/issuer';

test('#01: Successfully parses public address from issuer string', async t => {
  const result = parsePublicAddressFromIssuer('did:ethr:0x1234');
  t.is(result, '0x1234');
});

test('#01: Returns empty string if public address fails to parse', async t => {
  // Notice that public address should be undefined
  const result = parsePublicAddressFromIssuer('did:ethr');
  t.is(result, '');
});
