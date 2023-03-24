/* eslint-disable prefer-destructuring */
import { BaseModule } from '../base-module';
import { MintRequest } from '../../types';
import { post } from '../../utils/rest';
import { createApiKeyMissingError, mintingError } from '../../core/sdk-exceptions';
import { isMintRequest } from '../../utils/type-guards';

const v1StartMint721Path = '/v1/admin/nft/mint/721_mint';
const v1StartMint1155Path = '/v1/admin/nft/mint/1155_mint';

export class MintModule extends BaseModule {
  public async startMint721(contractId: string, quantity: number, destinationAddress: string): Promise<MintRequest> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = {
      contract_id: contractId,
      quantity,
      destination_address: destinationAddress,
    };
    const response = await post(`${this.sdk.apiBaseUrl}${v1StartMint721Path}`, this.sdk.secretApiKey, body, true);
    if (!isMintRequest(response)) throw mintingError();
    const request: MintRequest = response;
    return request;
  }

  public async startMint1155(
    contractId: string,
    quantity: number,
    destinationAddress: string,
    tokenId: number,
  ): Promise<MintRequest> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = {
      contract_id: contractId,
      quantity,
      destination_address: destinationAddress,
      token_id: tokenId,
    };
    const response = await post(`${this.sdk.apiBaseUrl}${v1StartMint1155Path}`, this.sdk.secretApiKey, body, true);
    if (!isMintRequest(response)) throw mintingError();
    const request: MintRequest = response;
    return request;
  }
}
