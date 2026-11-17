import { createMagicAdminSDK } from '../../../lib/factories';
import {
  EXPIRED_DIDT,
  INVALID_DIDT_MALFORMED_CLAIM,
  VALID_DIDT,
  VALID_DIDT_PARSED_CLAIMS,
} from '../../../lib/constants';
import { WalletType } from '../../../../src/types/wallet-types';
import { createIncorrectSignerAddressError } from '../../../../src/core/sdk-exceptions';

const matchingMetadata = { issuer: VALID_DIDT_PARSED_CLAIMS.iss };

test('Successfully GETs to metadata endpoint via public address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve(matchingMetadata));
  (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByToken(VALID_DIDT)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss]);
});

test('Successfully GETs to metadata endpoint via public address and wallet type', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve(matchingMetadata));
  (sdk.users.getMetadataByIssuerAndWallet as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByTokenAndWallet(VALID_DIDT, WalletType.ALGOD)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss, 'ALGOD']);
});

test('Successfully GETs to metadata endpoint via public address and none wallet type', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = jest.fn().mockImplementation(() => Promise.resolve(matchingMetadata));
  (sdk.users.getMetadataByIssuerAndWallet as any) = getMetadataStub;

  await expect(sdk.users.getMetadataByTokenAndWallet(VALID_DIDT, WalletType.NONE)).resolves.not.toThrow();

  const getMetadataArguments = getMetadataStub.mock.calls[0];
  expect(getMetadataArguments).toEqual([VALID_DIDT_PARSED_CLAIMS.iss, 'NONE']);
});

test('Rejects metadata that belongs to a different issuer', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk.users.getMetadataByIssuer as any) = jest.fn().mockResolvedValue({
    issuer: 'did:ethr:0x2222222222222222222222222222222222222222',
  });

  await expect(sdk.users.getMetadataByToken(VALID_DIDT)).rejects.toThrow(createIncorrectSignerAddressError());
});

test('Rejects metadata without a canonical issuer', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk.users.getMetadataByIssuer as any) = jest.fn().mockResolvedValue({ issuer: null });

  await expect(sdk.users.getMetadataByToken(VALID_DIDT)).rejects.toThrow(createIncorrectSignerAddressError());
});

test('Rejects metadata with a malformed issuer', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk.users.getMetadataByIssuer as any) = jest.fn().mockResolvedValue({ issuer: 'not-an-issuer' });

  await expect(sdk.users.getMetadataByToken(VALID_DIDT)).rejects.toThrow(createIncorrectSignerAddressError());
});

test('Rejects mismatched canonical metadata issuer for wallet-specific lookups', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk.users.getMetadataByIssuerAndWallet as any) = jest.fn().mockResolvedValue({
    issuer: 'did:ethr:0x2222222222222222222222222222222222222222',
  });

  await expect(sdk.users.getMetadataByTokenAndWallet(VALID_DIDT, WalletType.ALGOD)).rejects.toThrow(
    createIncorrectSignerAddressError(),
  );
});

test('Accepts a differently cased canonical issuer and an alternate wallet address', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  const metadata = {
    issuer: VALID_DIDT_PARSED_CLAIMS.iss.toLowerCase(),
    publicAddress: 'alternate-wallet-address',
  };
  (sdk.users.getMetadataByIssuerAndWallet as any) = jest.fn().mockResolvedValue(metadata);

  await expect(sdk.users.getMetadataByTokenAndWallet(VALID_DIDT, WalletType.ALGOD)).resolves.toEqual(metadata);
});

test.each([['malformed', INVALID_DIDT_MALFORMED_CLAIM], ['expired', EXPIRED_DIDT]])(
  'Rejects %s tokens before metadata lookup',
  async (_description, didToken) => {
    const sdk = createMagicAdminSDK('https://example.com');
    const getMetadataStub = jest.fn();
    (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

    await expect(sdk.users.getMetadataByToken(didToken)).rejects.toThrow();
    expect(getMetadataStub).not.toHaveBeenCalled();
  },
);

test.each([['malformed', INVALID_DIDT_MALFORMED_CLAIM], ['expired', EXPIRED_DIDT]])(
  'Rejects %s tokens before wallet-specific metadata lookup',
  async (_description, didToken) => {
    const sdk = createMagicAdminSDK('https://example.com');
    const getMetadataStub = jest.fn();
    (sdk.users.getMetadataByIssuerAndWallet as any) = getMetadataStub;

    await expect(sdk.users.getMetadataByTokenAndWallet(didToken, WalletType.ALGOD)).rejects.toThrow();
    expect(getMetadataStub).not.toHaveBeenCalled();
  },
);
