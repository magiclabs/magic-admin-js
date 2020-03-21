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
import { ecRecover } from '../../utils/ec-recover';

export class TokenModule extends BaseModule {
  public validate(DIDToken: string, attachment = 'none') {
    let tokenSigner = '';
    let attachmentSigner = '';
    let claimedIssuer = '';
    let parsedClaim;
    let proof: string;
    let claim: string;

    try {
      [proof, claim] = JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary')) as [string, string];
      parsedClaim = JSON.parse(claim) as Claim;
      claimedIssuer = parsedClaim.iss.split(':')[2].toLowerCase() ?? '';
      console.log('here');
      if (!isDIDTClaim(parsedClaim)) throw new Error();
    } catch {
      throw createMalformedTokenError();
    }

    try {
      // Recover the token signer
      tokenSigner = ecRecover(claim, proof).toLowerCase();

      // Recover the attachment signer
      attachmentSigner = ecRecover(attachment, parsedClaim.add).toLowerCase();
    } catch {
      throw createFailedRecoveringProofError();
    }

    // Assert the expected signer
    if (claimedIssuer !== tokenSigner || claimedIssuer !== attachmentSigner) {
      throw createIncorrectSignerAddressError();
    }

    // Assert the token is not expired
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
