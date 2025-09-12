import { createApiKeyMissingError } from '../../../../src/core/sdk-exceptions';
import { post } from '../../../../src/utils/rest';
import { API_KEY } from '../../../lib/constants';
import { createMagicAdminSDK } from '../../../lib/factories';

test('Successfully POSTs to logout endpoint via DIDT', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = jest.fn();
  (post as any) = postStub;

  await expect(sdk.users.logoutByIssuer('did:ethr:0x1234')).resolves.not.toThrow();

  const postArguments = postStub.mock.calls[0];
  expect(postArguments).toEqual(['https://example.com/v1/admin/user/logout', API_KEY, { issuer: 'did:ethr:0x1234' }]);
});

test('Fails POST if API key is missing', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const postStub = jest.fn();
  (post as any) = postStub;

  const expectedError = createApiKeyMissingError();

  await expect(sdk.users.logoutByIssuer('did:ethr:0x1234')).rejects.toThrow(expectedError);

  expect(postStub).not.toHaveBeenCalled();
});
