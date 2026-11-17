import { parsePublicAddressFromIssuer } from '../../../../src/utils/issuer';

test('Successfully parses public address from issuer string', async () => {
  const result = parsePublicAddressFromIssuer('did:ethr:0xB2ec9b61699762491b6542278E9dFEC9050f8089');
  expect(result).toBe('0xb2ec9b61699762491b6542278e9dfec9050f8089');
});

test.each([
  'did:ethr',
  'did:ethr:0x1234',
  'did:key:0xB2ec9b61699762491b6542278E9dFEC9050f8089',
  'did:ethr:0xB2ec9b61699762491b6542278E9dFEC9050f8089:&issuer=did:ethr:0x123',
  'did:ethr:0xB2ec9b61699762491b6542278E9dFEC9050f8089\n',
  'did:ethr:0xB2ec9b61699762491b6542278E9dFEC9050f8089\r\n',
  ' did:ethr:0xB2ec9b61699762491b6542278E9dFEC9050f8089',
])('Returns empty string for malformed issuer %s', async (issuer) => {
  const result = parsePublicAddressFromIssuer(issuer);
  expect(result).toBe('');
});

test('Returns empty string for a non-string issuer', async () => {
  expect(parsePublicAddressFromIssuer(1234 as any)).toBe('');
});
