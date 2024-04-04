import { createMagicAdminSDK } from '../../../lib/factories';

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  return {
      ...originalModule,
      ethers: {
          ...originalModule.ethers,
          Contract: jest.fn(() => ({
            balanceOf: jest.fn().mockImplementation((walletAddress: string, tokenId?: string) => {
                if (tokenId === '2') {
                    return BigInt(1); // User owns token
                } else {
                    return BigInt(0); // User doesn't own token
                }
            }),
          })),
      },
  };
});


test('Throws an error if ERC1155 and no token provided', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', 'https://example.com')).rejects.toThrow(
    'ERC1155 requires a tokenId',
  );
});

test('Returns an error if DID token is malformed', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_MALFORMED_TOKEN
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'ERROR_MALFORMED_TOKEN' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', 'https://example.com', '1')).resolves.toEqual({
    valid: false,
    error_code: 'UNAUTHORIZED',
    message: 'Invalid DID token: ERROR_MALFORMED_TOKEN',
  });
});

test('Returns an error if DID token is expired', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_DIDT_EXPIRED
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'ERROR_DIDT_EXPIRED' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', 'https://example.com', '1')).resolves.toEqual({
    valid: false,
    error_code: 'UNAUTHORIZED',
    message: 'Invalid DID token: ERROR_DIDT_EXPIRED',
  });
});

test('Throws an error if DID token validation returns unexpected error code', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_MALFORMED_TOKEN
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'UNKNOWN' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', 'https://example.com', '1')).rejects.toThrow();
});

test('Returns an error if ERC721 token is not owned by user', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation to return ok
  sdk.token.validate = jest.fn().mockResolvedValue({});
  // Mock the getPublicAddress to return valid email and wallet
  sdk.token.getPublicAddress = jest.fn().mockReturnValue('0x610dcb8fd5cf7f544b85290889a456916fbeaba2');

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC721',
      'https://example.com',
      '1',
    ),
  ).resolves.toEqual({
    valid: false,
    error_code: 'NO_OWNERSHIP',
    message: 'User does not own this token.',
  });
});

test('Returns an error if ERC1155 token is not owned by user', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation to return ok
  sdk.token.validate = jest.fn().mockResolvedValue({});
  // Mock the getPublicAddress to return valid email and wallet
  sdk.token.getPublicAddress = jest.fn().mockReturnValue('0x610dcb8fd5cf7f544b85290889a456916fbeaba2');

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC1155',
      'https://example.com',
      '1',
    ),
  ).resolves.toEqual({
    valid: false,
    error_code: 'NO_OWNERSHIP',
    message: 'User does not own this token.',
  });
});

test('Returns success if ERC1155 token is owned by user', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation to return ok
  sdk.token.validate = jest.fn().mockResolvedValue({});
  // Mock the getPublicAddress to return valid email and wallet
  sdk.token.getPublicAddress = jest.fn().mockReturnValue('0x610dcb8fd5cf7f544b85290889a456916fbeaba2');

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC1155',
      'https://example.com',
      '2',
    ),
  ).resolves.toEqual({
    valid: true,
    error_code: '',
    message: '',
  });
});
