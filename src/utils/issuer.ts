export function generateIssuerFromPublicAddress(publicAddress: string, method = 'ethr') {
  return `did:${method}:${publicAddress}`;
}

export function parsePublicAddressFromIssuer(issuer: string) {
  return issuer.split(':')[2]?.toLowerCase() ?? '';
}
