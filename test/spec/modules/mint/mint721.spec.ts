import { createMagicAdminSDK } from '../../../lib/factories';
import { API_KEY } from '../../../lib/constants';
import { createApiKeyMissingError, mintingError } from '../../../../src/core/sdk-exceptions';
import { post } from '../../../../src/utils/rest';

const successReq = Promise.resolve({
  request_id: 'foo_123',
});

const failReq = Promise.resolve({
  error: 'bar_456',
});

test('Successfully POSTs to 721 minting endpoint', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = jest.fn().mockImplementation(() => successReq);
  (post as any) = postStub;

  await expect(sdk.mint.startMint721('0xfoo', 1, '0xbar')).resolves.toEqual({ request_id: 'foo_123' });

  const postArguments = postStub.mock.calls[0];
  expect(postArguments).toEqual([
    'https://example.com/v1/admin/nft/mint/721_mint',
    API_KEY,
    { contract_id: '0xfoo', quantity: 1, destination_address: '0xbar' },
  ]);
});

test('Throws an error if Minting API was unsuccessful', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = jest.fn().mockImplementation(() => failReq);
  (post as any) = postStub;

  const expectedError = mintingError();

  await expect(sdk.mint.startMint721('0xfoo', 1, '0xbar')).rejects.toThrow(expectedError);
});

test('Fails POST if API key is missing', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const postStub = jest.fn();
  (post as any) = postStub;

  const expectedError = createApiKeyMissingError();

  await expect(sdk.mint.startMint721('0xfoo', 1, '0xbar')).rejects.toThrow(expectedError);

  expect(postStub).not.toBeCalled();
});
