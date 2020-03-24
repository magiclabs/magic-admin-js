/** The shape of metadata encoded within a DID Token. */
export interface Claim {
  iat: number; // Issued At Timestamp
  ext: number; // Expiration Timestamp
  iss: string; // Issuer of DID Token
  sub: string; // Subject
  aud: string; // Audience
  nbf: number; // Not Before Timestamp
  tid: string; // DID Token ID
  add: string; // Encrypted signature of arbitrary data
}

export type ParsedDIDToken = [string, Claim];
