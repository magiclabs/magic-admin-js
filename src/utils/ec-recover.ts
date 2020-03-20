import ethSigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';

/**
 * Recover the signer from an Elliptic Curve signature.
 */
export function ecRecover(data: string, signature: string) {
  // Use ecRecover on the Proof, to validate if it recovers to the expected
  // Claim, and expected Signer Address.
  const ecRecoverMsgParams = {
    data: ethUtil.bufferToHex(Buffer.from(data, 'utf8')),
    sig: signature,
  };

  return ethSigUtil.recoverPersonalSignature(ecRecoverMsgParams);
}
