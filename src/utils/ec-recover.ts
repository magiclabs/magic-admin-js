import { keccak256 } from 'ethereum-cryptography/keccak';
import { ecdsaRecover, publicKeyConvert } from 'ethereum-cryptography/secp256k1-compat';
import { utf8ToBytes, bytesToHex, hexToBytes } from 'ethereum-cryptography/utils';

function hashPersonalMessage(message: Uint8Array): Uint8Array {
  const prefix = utf8ToBytes(`\u0019Ethereum Signed Message:\n${message.length}`);
  const totalLength = prefix.length + message.length;

  const output = new Uint8Array(totalLength);
  output.set(prefix);
  output.set(message, prefix.length);

  return keccak256(output);
}

function getRecoveryBit(signature: Uint8Array): number {
  const bit = signature[64];
  return bit - 27;
}

function prepareSignature(signature: string): string {
  return signature.slice(2); // strip the `0x` prefix
}

function publicKeyToAddress(publicKey: Uint8Array): string {
  const address = keccak256(publicKey.slice(1)).slice(-20);
  return `0x${bytesToHex(address)}`;
}

/**
 * Recover the signer from an Elliptic Curve signature.
 */
export function ecRecover(data: string, signature: string) {
  // Use ecdsaRecover on the Proof, to validate if it recovers to the expected
  // Claim, and expected Signer Address.

  const msg = utf8ToBytes(data);
  const sig = hexToBytes(prepareSignature(signature));
  const recovery = getRecoveryBit(sig);
  const hash = hashPersonalMessage(msg);

  const publicKey = ecdsaRecover(sig.slice(0, 64), recovery, hash, false);
  const assertPublicKey = publicKeyConvert(publicKey, false);

  return publicKeyToAddress(assertPublicKey);
}
