import Web3 from 'web3';
import { BaseModule } from '../base-module';
import {createExpectedBearerStringError, MagicAdminSDKError} from '../../core/sdk-exceptions';
import { ValidateTokenOwnershipResponse } from '../../types';
import { ERC1155ContractABI, ERC721ContractABI } from './ownershipABIs';
import { ErrorCode } from '../../types';

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
    // Validate DID token
    try {
      this.sdk.token.validate(didToken);
    } catch (e) {
      // Check if code is malformed token
      if ((e as MagicAdminSDKError).code === 'ERROR_MALFORMED_TOKEN') {
        return {
          valid: false,
          error_code: 'UNAUTHORIZED',
          message: 'Invalid DID token: ' + ErrorCode.MalformedTokenError,
        };
      }
      if (e.code === ErrorCode.TokenExpired) {
        return {
          valid: false,
          error_code: 'UNAUTHORIZED',
          message: 'Invalid DID token: ' + ErrorCode.TokenExpired,
        };
      }
      throw new Error((e as MagicAdminSDKError).code);
    }
    const walletAddress = this.sdk.token.getPublicAddress(didToken);

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
