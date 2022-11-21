import { createMagicAdminSDK } from '../../../lib/factories';

test('Successfully GETs to metadata endpoint via public address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const logoutStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.logoutByIssuer as any) = logoutStub;

  await expect(sdk.users.logoutByPublicAddress('0x1234')).resolves.not.toThrow();

  const logoutArguments = logoutStub.mock.calls[0];
  expect(logoutArguments).toEqual(['did:ethr:0x1234']);
});
