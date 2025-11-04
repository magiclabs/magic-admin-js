import { createMalformedTokenError } from '../core/sdk-exceptions';

export interface JWTPayload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration time
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string; // JWT ID
  [key: string]: any; // Allow additional claims
}

export interface JWTHeader {
  alg: string; // Algorithm
  typ?: string; // Type
  kid?: string; // Key ID
  [key: string]: any; // Allow additional header fields
}

export interface ParsedJWT {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
}

/**
 * Base64URL decode helper
 */
function base64UrlDecode(str: string): string {
  // Add padding if needed
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(base64, 'base64').toString('utf-8');
    }
    // Browser fallback
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    throw createMalformedTokenError();
  }
}

/**
 * Parses a JWT token into its components.
 */
export function parseJWT(jwt: string): ParsedJWT {
  try {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const [headerB64, payloadB64, signature] = parts;

    const headerStr = base64UrlDecode(headerB64);
    const payloadStr = base64UrlDecode(payloadB64);

    const header = JSON.parse(headerStr) as JWTHeader;
    const payload = JSON.parse(payloadStr) as JWTPayload;

    return {
      header,
      payload,
      signature,
      raw: {
        header: headerB64,
        payload: payloadB64,
        signature,
      },
    };
  } catch {
    throw createMalformedTokenError();
  }
}

