import { Claim, ParsedDIDToken } from '../types';
import { isDIDTClaim } from './type-guards';
import { createMalformedTokenError } from '../core/sdk-exceptions';
import { decodeValue } from './codec';

interface ParseDIDTokenResult {
  raw: [string, string];
  withParsedClaim: ParsedDIDToken;
}

/**
 * Parses a DID Token so that the encoded `claim` is in object form.
 */
export function parseDIDToken(didToken: string): ParseDIDTokenResult {
  try {
    const [proof, claim] = JSON.parse(decodeValue(didToken)) as [string, string];
    const parsedClaim = JSON.parse(claim) as Claim;
    if (isDIDTClaim(parsedClaim)) return { raw: [proof, claim], withParsedClaim: [proof, parsedClaim] };
    throw new Error();
  } catch {
    throw createMalformedTokenError();
  }
}
