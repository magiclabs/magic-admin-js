import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';
import { WalletType } from '../../../../src/types/wallet-types';

test('#01: Successfully GETs to metadata endpoint via public address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByToken(VALID_DIDT)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss]);
});

test('#02: Successfully GETs to metadata endpoint via public address and wallet type', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve());
  (sdk.users.getMetadataByIssuerAndWallet as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByTokenAndWallet(VALID_DIDT, WalletType.ALGOD)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss, 'ALGOD']);
});
