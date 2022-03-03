import { parsePublicAddressFromIssuer } from '../../../../src/utils/issuer';

test('#01: Successfully parses public address from issuer string', async () => {
  const result = parsePublicAddressFromIssuer('did:ethr:0x1234');
  expect(result).toBe('0x1234');
});

test('#01: Returns empty string if public address fails to parse', async () => {
  // Notice that public address should be undefined
  const result = parsePublicAddressFromIssuer('did:ethr');
  expect(result).toBe('');
});
