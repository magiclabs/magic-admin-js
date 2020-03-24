/* eslint-disable prefer-destructuring */
import { BaseModule } from '../base-module';
import { ParsedDIDToken } from '../../types';
import {
  createFailedRecoveringProofError,
  createIncorrectSignerAddressError,
  createTokenExpiredError,
  createMalformedTokenError,
} from '../../core/sdk-exceptions';
import { ecRecover } from '../../utils/ec-recover';
import { parseDIDToken } from '../../utils/parse-didt';
import { parsePublicAddressFromIssuer } from '../../utils/issuer';

export class TokenModule extends BaseModule {
  public validate(DIDToken: string, attachment = 'none') {
    let tokenSigner = '';
    let attachmentSigner = '';
    let claimedIssuer = '';
    let parsedClaim;
    let proof: string;
    let claim: string;

    try {
      const tokenParseResult = parseDIDToken(DIDToken);
      [proof, claim] = tokenParseResult.raw;
      parsedClaim = tokenParseResult.withParsedClaim[1];
      claimedIssuer = parsePublicAddressFromIssuer(parsedClaim.iss);
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

  public decode(DIDToken: string): ParsedDIDToken {
    const parsedToken = parseDIDToken(DIDToken);
    return parsedToken.withParsedClaim;
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
