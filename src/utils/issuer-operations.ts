export function generateIssuerFromPublicAddress(publicAddress: string) {
  return `did:ethr:${publicAddress}`;
}

export function parsePublicAddressFromIssuer(issuer: string) {
  return issuer.split(':')[2]?.toLowerCase() ?? '';
}
