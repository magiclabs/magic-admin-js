import ethSigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import { BaseModule } from '../base-module';
import { Claim } from '../../types';
import {
  createFailedRecoveringProofError,
  createIncorrectSignerAddressError,
  createTokenExpiredError,
} from '../../core/sdk-exceptions';

export class TokenModule extends BaseModule {
  public async validate(DIDToken: string) {
    let recoveredSignerAddress = '';
    let claimedIssuer = '';
    let claimJSONObject;

    try {
      /* Decoded DIDToken: [proof, claim] */
      const decodedDIDToken = JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary'));
      const proof = decodedDIDToken[0] as string;
      const claim = decodedDIDToken[1] as string;
      claimJSONObject = JSON.parse(claim) as Claim;

      /**
       * Use ecRecover on the Proof, to validate if it recovers to the expected
       * Claim, and expected Signer Address
       */
      const ecRecoverMsgParams = {
        data: ethUtil.bufferToHex(Buffer.from(claim, 'utf8')),
        sig: proof,
      };
      recoveredSignerAddress = ethSigUtil.recoverPersonalSignature(ecRecoverMsgParams);

      // eslint-disable-next-line prefer-destructuring
      claimedIssuer = claimJSONObject.iss.split(':')[2];
    } catch (err) {
      throw createFailedRecoveringProofError();
    }

    if (claimedIssuer.toLowerCase() !== recoveredSignerAddress.toLowerCase()) {
      throw createIncorrectSignerAddressError();
    }

    if (claimJSONObject.ext < Math.floor(Date.now() / 1000) - 30) {
      throw createTokenExpiredError();
    }
  }

  public decode(DIDToken: string): any[] {
    return JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary')) as any[];
  }

  public getPublicAddress(DIDToken: string): string {
    const decodedDIDToken = this.decode(DIDToken);
    const claimJSONObject = JSON.parse(decodedDIDToken[1]) as Claim;
    const claimedIssuer = claimJSONObject?.iss.split(':')[2];
    return claimedIssuer;
  }
}
