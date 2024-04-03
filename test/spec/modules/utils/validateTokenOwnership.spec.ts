import Web3 from 'web3';
import { createMagicAdminSDK } from '../../../lib/factories';

test('Throws an error if ERC1155 and no token provided', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  const web3 = new Web3('https://example.com');

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', web3)).rejects.toThrow(
    'ERC1155 requires a tokenId',
  );
});

test('Returns an error if DID token is malformed', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  const web3 = new Web3('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_MALFORMED_TOKEN
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'ERROR_MALFORMED_TOKEN' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', web3, '1')).resolves.toEqual({
    valid: false,
    error_code: 'UNAUTHORIZED',
    message: 'Invalid DID token: ERROR_MALFORMED_TOKEN',
  });
});

test('Returns an error if DID token is expired', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  const web3 = new Web3('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_DIDT_EXPIRED
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'ERROR_DIDT_EXPIRED' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', web3, '1')).resolves.toEqual({
    valid: false,
    error_code: 'UNAUTHORIZED',
    message: 'Invalid DID token: ERROR_DIDT_EXPIRED',
  });
});

test('Throws an error if DID token validation returns unexpected error code', async () => {
  const sdk = createMagicAdminSDK('https://example.com');
  const web3 = new Web3('https://example.com');

  // Mock the magic token validation by setting the code to ERROR_MALFORMED_TOKEN
  sdk.token.validate = jest.fn().mockRejectedValue({ code: 'UNKNOWN' });

  await expect(sdk.utils.validateTokenOwnership('did:ethr:0x123', '0xfoo', 'ERC1155', web3, '1')).rejects.toThrow();
});

test('Returns an error if ERC721 token is not owned by user', async () => {
  const sdk = createMagicAdminSDK('https://example.com');

  // Mock the magic token validation to return ok
  sdk.token.validate = jest.fn().mockResolvedValue({});
  // Mock the getPublicAddress to return valid email and wallet
  sdk.token.getPublicAddress = jest.fn().mockReturnValue('0x610dcb8fd5cf7f544b85290889a456916fbeaba2');
  // Mock the web3 contract.methods.balanceOf to return 0
  const callStub = jest.fn().mockResolvedValue(BigInt(0));
  // Mock the contract instance
  const contractMock: any = {
    methods: {
      balanceOf: jest.fn().mockReturnValue({ call: callStub }),
    },
  };
  // Mock web3.eth.Contract
  const web3 = new Web3('https://example.com');
  jest.spyOn(web3.eth, 'Contract').mockReturnValue(contractMock);

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC721',
      web3,
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
  // Mock the web3 contract.methods.balanceOf to return 0
  const callStub = jest.fn().mockResolvedValue(BigInt(0));
  // Mock the contract instance
  const contractMock: any = {
    methods: {
      balanceOf: jest.fn().mockReturnValue({ call: callStub }),
    },
  };
  // Mock web3.eth.Contract
  const web3 = new Web3('https://example.com');
  jest.spyOn(web3.eth, 'Contract').mockReturnValue(contractMock);

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC1155',
      web3,
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
  // Mock the web3 contract.methods.balanceOf to return 0
  const callStub = jest.fn().mockResolvedValue(BigInt(1));
  // Mock the contract instance
  const contractMock: any = {
    methods: {
      balanceOf: jest.fn().mockReturnValue({ call: callStub }),
    },
  };
  // Mock web3.eth.Contract
  const web3 = new Web3('https://example.com');
  jest.spyOn(web3.eth, 'Contract').mockReturnValue(contractMock);

  await expect(
    sdk.utils.validateTokenOwnership(
      'did:ethr:0x123',
      '0x610dcb8fd5cf7f544b85290889a456916fbeaba2',
      'ERC1155',
      web3,
      '1',
    ),
  ).resolves.toEqual({
    valid: true,
    error_code: '',
    message: '',
  });
});
