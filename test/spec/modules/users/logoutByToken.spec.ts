import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';

test('#01: Successfully GETs to metadata endpoint via public address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const logoutStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.logoutByIssuer as any) = logoutStub;

  await expect(sdk.users.logoutByToken(VALID_DIDT)).resolves.not.toThrow();

  const logoutArguments = logoutStub.mock.calls[0];
  expect(logoutArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss]);
});
