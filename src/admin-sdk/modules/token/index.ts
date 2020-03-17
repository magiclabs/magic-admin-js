import ethSigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import { BaseModule } from '../base-module';
import { Claim } from '../../types';
import {
  createFailedRecoveringProofError,
  createIncorrectSignerAddressError,
  createTokenExpiredError,
  createMalformedTokenError,
} from '../../core/sdk-exceptions';
import { isDIDTClaim } from '../../utils/type-guards';

export class TokenModule extends BaseModule {
  public async validate(DIDToken: string) {
    let recoveredSignerAddress = '';
    let claimedIssuer = '';
    let proof: string;
    let claim: string;
    let parsedClaim;

    try {
      [proof, claim] = JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary')) as [string, string];
      parsedClaim = JSON.parse(claim) as Claim;
      if (!isDIDTClaim(parsedClaim)) throw new Error();
    } catch {
      throw createMalformedTokenError();
    }

    try {
      /**
       * Use ecRecover on the Proof, to validate if it recovers to the expected
       * Claim, and expected Signer Address.
       */
      const ecRecoverMsgParams = {
        data: ethUtil.bufferToHex(Buffer.from(claim, 'utf8')),
        sig: proof,
      };
      recoveredSignerAddress = ethSigUtil.recoverPersonalSignature(ecRecoverMsgParams);

      // eslint-disable-next-line prefer-destructuring
      claimedIssuer = parsedClaim.iss.split(':')[2];
    } catch {
      throw createFailedRecoveringProofError();
    }

    if (claimedIssuer.toLowerCase() !== recoveredSignerAddress.toLowerCase()) {
      throw createIncorrectSignerAddressError();
    }

    if (parsedClaim.ext < Math.floor(Date.now() / 1000) - 30) {
      throw createTokenExpiredError();
    }
  }

  public decode(DIDToken: string): [string, Claim] {
    try {
      const [proof, claim] = JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary')) as [string, string];
      const parsedClaim = JSON.parse(claim) as Claim;
      if (isDIDTClaim(parsedClaim)) return [proof, parsedClaim];
      throw new Error();
    } catch {
      throw createMalformedTokenError();
    }
  }

  public getPublicAddress(DIDToken: string): string {
    const claim = this.decode(DIDToken)[1];
    const claimedIssuer = claim.iss.split(':')[2];
    return claimedIssuer;
  }

  public getIssuer(DIDToken: string): string {
    return this.decode(DIDToken)[1].iss;
  }
}
