import { Claim, ParsedDIDToken } from '../types';
import { isDIDTClaim } from './type-guards';
import { createMalformedTokenError } from '../core/sdk-exceptions';

interface ParseDIDTokenResult {
  raw: [string, string];
  withParsedClaim: ParsedDIDToken;
}

/**
 * Parses a DID Token so that the encoded `claim` is in object form.
 */
export function parseDIDToken(DIDToken: string): ParseDIDTokenResult {
  try {
    const [proof, claim] = JSON.parse(Buffer.from(DIDToken, 'base64').toString('binary')) as [string, string];
    const parsedClaim = JSON.parse(claim) as Claim;
    if (isDIDTClaim(parsedClaim)) return { raw: [proof, claim], withParsedClaim: [proof, parsedClaim] };
    throw new Error();
  } catch {
    throw createMalformedTokenError();
  }
}
