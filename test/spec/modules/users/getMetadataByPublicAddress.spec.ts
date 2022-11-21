import { WalletType } from '../../../../src/types/wallet-types';
import { createMagicAdminSDK } from '../../../lib/factories';

test('Successfully GETs to metadata endpoint via public address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByPublicAddress('0x1234')).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual(['did:ethr:0x1234']);
});

test('Successfully GETs to metadata endpoint via public address and wallet type', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.getMetadataByIssuerAndWallet as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByPublicAddressAndWallet('0x1234', WalletType.ANY)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual(['did:ethr:0x1234', 'ANY']);
});
