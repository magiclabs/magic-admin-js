import { createApiKeyMissingError } from '../../../../src/core/sdk-exceptions';
import { WalletType } from '../../../../src/types/wallet-types';
import { get } from '../../../../src/utils/rest';
import { API_KEY } from '../../../lib/constants';
import { createMagicAdminSDK } from '../../../lib/factories';

const successRes = Promise.resolve({
  issuer: 'foo',
  public_address: 'bar',
  email: 'baz',
  oauth_provider: 'foo1',
  phone_number: '+1234',
  username: 'buzz',
});
const successResWithWallets = Promise.resolve({
  issuer: 'foo',
  public_address: 'bar',
  email: 'baz',
  oauth_provider: 'foo1',
  phone_number: '+1234',
  username: 'buzz',
  wallets: [
    {
      wallet_type: 'SOLANA',
      network: 'MAINNET',
      public_address: 'barxyz',
    },
  ],
});
const nullRes = Promise.resolve({});

test('Successfully GETs to metadata endpoint via issuer', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getStub = jest.fn().mockImplementation(() => successRes);
  (get as any) = getStub;

  const result = await sdk.users.getMetadataByIssuer('did:ethr:0x1234');

  console.log(result);

  const getArguments = getStub.mock.calls[0];
  expect(getArguments).toEqual([
    'https://example.com/v1/admin/user',
    API_KEY,
    { issuer: 'did:ethr:0x1234', wallet_type: 'NONE' },
  ]);

  expect(result).toEqual({
    issuer: 'foo',
    publicAddress: 'bar',
    email: 'baz',
    oauthProvider: 'foo1',
    phoneNumber: '+1234',
    username: 'buzz',
    wallets: null,
  });
});

test('Successfully GETs `null` metadata endpoint via issuer', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getStub = jest.fn().mockImplementation(() => nullRes);
  (get as any) = getStub;

  const result = await sdk.users.getMetadataByIssuer('did:ethr:0x1234');

  const getArguments = getStub.mock.calls[0];
  expect(getArguments).toEqual([
    'https://example.com/v1/admin/user',
    API_KEY,
    { issuer: 'did:ethr:0x1234', wallet_type: 'NONE' },
  ]);
  expect(result).toEqual({
    issuer: null,
    publicAddress: null,
    email: null,
    oauthProvider: null,
    phoneNumber: null,
    username: null,
    wallets: null,
  });
});

test('Fails GET if API key is missing', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const getStub = jest.fn().mockImplementation();
  (get as any) = getStub;

  const expectedError = createApiKeyMissingError();
  expect(sdk.users.getMetadataByIssuer('did:ethr:0x1234')).rejects.toThrow(expectedError);

  expect(getStub).not.toHaveBeenCalled();
});

test('Successfully GETs to metadata endpoint via issuer and wallet type', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getStub = jest.fn().mockImplementation(() => successResWithWallets);
  (get as any) = getStub;

  const result = await sdk.users.getMetadataByIssuerAndWallet('did:ethr:0x1234', WalletType.SOLANA);

  const getArguments = getStub.mock.calls[0];
  expect(getArguments).toEqual([
    'https://example.com/v1/admin/user',
    API_KEY,
    { issuer: 'did:ethr:0x1234', wallet_type: 'SOLANA'},
  ]);
  expect(result).toEqual({
    issuer: 'foo',
    publicAddress: 'bar',
    email: 'baz',
    oauthProvider: 'foo1',
    phoneNumber: '+1234',
    username: 'buzz',
    wallets: [
      {
        wallet_type: 'SOLANA',
        network: 'MAINNET',
        public_address: 'barxyz',
      },
    ],
  });
});
