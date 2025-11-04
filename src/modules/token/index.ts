/* eslint-disable prefer-destructuring */
import { BaseModule } from '../base-module';
import { ParsedDIDToken } from '../../types';
import {
  createFailedRecoveringProofError,
  createIncorrectSignerAddressError,
  createTokenExpiredError,
  createMalformedTokenError,
  createTokenCannotBeUsedYetError,
  createAudienceMismatchError,
} from '../../core/sdk-exceptions';
import { ecRecover } from '../../utils/ec-recover';
import { parseDIDToken } from '../../utils/parse-didt';
import { parsePublicAddressFromIssuer } from '../../utils/issuer';
import { parseJWT } from '../../utils/parse-jwt';

export class TokenModule extends BaseModule {
  public validate(DIDToken: string, attachment = 'none') {
    let tokenSigner = '';
    let attachmentSigner: string | null = null;
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
      if (attachment && attachment !== 'none') {
        attachmentSigner = ecRecover(attachment, parsedClaim.add).toLowerCase();
      }
    } catch {
      throw createFailedRecoveringProofError();
    }

    // Assert the expected signer
    if (claimedIssuer !== tokenSigner || (attachmentSigner && claimedIssuer !== attachmentSigner)) {
      throw createIncorrectSignerAddressError();
    }

    const timeSecs = Math.floor(Date.now() / 1000);
    const nbfLeeway = 300; // 5 min grace period

    // Assert the token is not expired
    if (parsedClaim.ext < timeSecs) {
      throw createTokenExpiredError();
    }

    // Assert the token is not used before allowed.
    if (parsedClaim.nbf - nbfLeeway > timeSecs) {
      throw createTokenCannotBeUsedYetError();
    }

    // Assert the audience matches the client ID.
    if (this.sdk.clientId && parsedClaim.aud !== this.sdk.clientId) {
      throw createAudienceMismatchError();
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

  /**
   * Validates a JWT token.
   * Similar to validate() but for JWT format tokens.
   * 
   * A JWT has three parts: header.payload.signature
   * The signature is automatically extracted, but verifying it cryptographically
   * requires checking it against the header+payload using the signing key.
   * 
   * @param jwtToken - The JWT token string to validate (format: header.payload.signature)
   * @param options - Optional configuration
   * @param options.verifySignature - Optional function to verify the JWT signature.
   *                                   The signature is already extracted from the JWT,
   *                                   but this function performs the cryptographic verification.
   *                                   Function receives: (header, payload, signature) => boolean
   *                                   If not provided, only claim validation is performed.
   */
  public validateJWT(
    jwtToken: string,
    options?: {
      verifySignature?: (header: any, payload: any, signature: string) => boolean;
    },
  ) {
    let parsedJWT;

    try {
      // Parse JWT into header, payload, and signature (signature is the 3rd part)
      parsedJWT = parseJWT(jwtToken);
    } catch {
      throw createMalformedTokenError();
    }

    const { payload, header, signature } = parsedJWT;

    // Verify signature cryptographically if verifier function is provided
    // The signature is already extracted above, but we need to verify it's valid
    if (options?.verifySignature) {
      try {
        const isValid = options.verifySignature(header, payload, signature);
        if (!isValid) {
          throw createFailedRecoveringProofError();
        }
      } catch {
        throw createFailedRecoveringProofError();
      }
    }

    const timeSecs = Math.floor(Date.now() / 1000);
    const nbfLeeway = 300; // 5 min grace period

    // Assert the token is not expired
    if (payload.exp && payload.exp < timeSecs) {
      throw createTokenExpiredError();
    }

    // Assert the token is not used before allowed.
    if (payload.nbf && payload.nbf - nbfLeeway > timeSecs) {
      throw createTokenCannotBeUsedYetError();
    }

    // Assert the audience matches the client ID.
    if (this.sdk.clientId && payload.aud) {
      const audience = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
      if (!audience.includes(this.sdk.clientId)) {
        throw createAudienceMismatchError();
      }
    }
  }
}
