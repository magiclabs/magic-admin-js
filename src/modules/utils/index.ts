import { ethers } from "ethers";
import { BaseModule } from '../base-module';
import {createExpectedBearerStringError} from '../../core/sdk-exceptions';
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
    rpcURL: string,
    tokenId?: string,
  ): Promise<ValidateTokenOwnershipResponse> {
    // Make sure if ERC1155 has a tokenId
    if (contractType === 'ERC1155' && !tokenId) {
      throw new Error('ERC1155 requires a tokenId');
    }
    // Validate DID token
    let walletAddress;
    try {
      await this.sdk.token.validate(didToken);
      walletAddress = this.sdk.token.getPublicAddress(didToken);
    } catch (e: any) {
      // Check if code is malformed token
      if (e.code && e.code === 'ERROR_MALFORMED_TOKEN') {
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
      throw new Error(e);
    }
    

    // Check on-chain if user owns NFT by calling contract with web3
    let balance = BigInt(0);
    const provider = new ethers.JsonRpcProvider(rpcURL);
    if (contractType === 'ERC721') {
      const contract = new ethers.Contract(contractAddress, ERC721ContractABI, provider);
      balance = BigInt(await contract.balanceOf(walletAddress));
    } else {
      const contract = new ethers.Contract(contractAddress, ERC1155ContractABI, provider);
      balance = BigInt(await contract.balanceOf(walletAddress, tokenId));
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
