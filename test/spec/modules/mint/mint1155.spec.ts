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

test('Successfully POSTs to 1155 minting endpoint', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = jest.fn().mockImplementation(() => successReq);
  (post as any) = postStub;

  await expect(sdk.mint.startMint1155('0xfoo', 1, '0xbar', 0)).resolves.toEqual({ request_id: 'foo_123' });

  const postArguments = postStub.mock.calls[0];
  expect(postArguments).toEqual([
    'https://example.com/v1/admin/nft/mint/1155_mint',
    API_KEY,
    { contract_id: '0xfoo', quantity: 1, destination_address: '0xbar', token_id: 0 },
  ]);
});

test('Throws an error if Minting API was unsuccessful', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = jest.fn().mockImplementation(() => failReq);
  (post as any) = postStub;

  const expectedError = mintingError();

  await expect(sdk.mint.startMint1155('0xfoo', 1, '0xbar', 0)).rejects.toThrow(expectedError);
});

test('Fails POST if API key is missing', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const postStub = jest.fn();
  (post as any) = postStub;

  const expectedError = createApiKeyMissingError();

  await expect(sdk.mint.startMint1155('0xfoo', 1, '0xbar', 0)).rejects.toThrow(expectedError);

  expect(postStub).not.toBeCalled();
});
