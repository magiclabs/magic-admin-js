import Web3 from 'web3';
import { BaseModule } from '../base-module';
import { createExpectedBearerStringError } from '../../core/sdk-exceptions';
import { ValidateTokenOwnershipResponse } from '../../types';
import { ERC1155ContractABI, ERC721ContractABI } from './ownershipABIs';

export class UtilsModule extends BaseModule {
  /**
   * Parse a raw DID Token from the given Authorization header.
   */
  public parseAuthorizationHeader(header: string) {
    if (!header.toLowerCase().startsWith('bearer ')) {
      throw createExpectedBearerStringError();
    }

    return header.substring(7);
  }

  // Token Gating function validates user ownership of wallet + NFT
  public async validateTokenOwnership(
    didToken: string,
    contractAddress: string,
    contractType: 'ERC721' | 'ERC1155',
    web3: Web3,
    tokenId?: string,
  ): Promise<ValidateTokenOwnershipResponse> {
    // Make sure if ERC1155 has a tokenId
    if (contractType === 'ERC1155' && !tokenId) {
      throw new Error('ERC1155 requires a tokenId');
    }
    // Call magic and validate DID token
    try {
      await this.sdk.token.validate(didToken);
    } catch (e) {
      // Check if code is malformed token
      if (e.code === 'ERROR_MALFORMED_TOKEN') {
        return {
          valid: false,
          error_code: 'UNAUTHORIZED',
          message: 'Invalid DID token: ERROR_MALFORMED_TOKEN',
        };
      }
      throw new Error(e.code);
    }
    const { email, publicAddress: walletAddress } = await this.sdk.users.getMetadataByToken(didToken);
    if (!email || !walletAddress) {
      return {
        valid: false,
        error_code: 'UNAUTHORIZED',
        message: 'Invalid DID token. May be expired or malformed.',
      };
    }

    // Check on-chain if user owns NFT by calling contract with web3
    let balance = BigInt(0);
    if (contractType === 'ERC721') {
      const contract = new web3.eth.Contract(ERC721ContractABI, contractAddress);
      balance = BigInt(await contract.methods.balanceOf(walletAddress).call());
    } else {
      const contract = new web3.eth.Contract(ERC1155ContractABI, contractAddress);
      balance = BigInt(await contract.methods.balanceOf(walletAddress, tokenId).call());
    }
    if (balance > BigInt(0)) {
      return {
        valid: true,
        error_code: '',
        message: '',
      };
    }
    return {
      valid: false,
      error_code: 'NO_OWNERSHIP',
      message: 'User does not own this token.',
    };
  }
}
