import { generateIssuerFromPublicAddress } from '../../../../src/utils/issuer';

test('#01: Successfully builds issuer string from public address', async () => {
  const result = generateIssuerFromPublicAddress('0x1234');
  expect(result).toBe('did:ethr:0x1234');
});

test('#01: Successfully builds issuer string from public address with overrided method', async () => {
  const result = generateIssuerFromPublicAddress('0x1234', 'test');
  expect(result).toBe('did:test:0x1234');
});
