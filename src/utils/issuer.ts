export function generateIssuerFromPublicAddress(publicAddress: string, method = 'ethr') {
  return `did:${method}:${publicAddress}`;
}

export function parsePublicAddressFromIssuer(issuer: string) {
  if (typeof issuer !== 'string') return '';

  const match = /^did:ethr:(0x[a-fA-F0-9]{40})$/.exec(issuer);
  return match?.[0] === issuer ? match[1].toLowerCase() : '';
}
