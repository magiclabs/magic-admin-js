import { ErrorCode } from '../types';

// --- Base SDK error class

export class MagicAdminSDKError extends Error {
  __proto__ = Error;

  constructor(public code: ErrorCode, message: string) {
    super(`Magic Admin SDK Error: [${code}] ${message}`);
    Object.setPrototypeOf(this, MagicAdminSDKError.prototype);
  }
}

// --- SDK error factories

export function createTokenExpiredError() {
  return new MagicAdminSDKError(ErrorCode.TokenExpired, 'DID Token has expired. Request failed authentication.');
}

export function createIncorrectSignerAddressError() {
  return new MagicAdminSDKError(
    ErrorCode.IncorrectSignerAddress,
    'Incorrect signer address for DID Token. Request failed authentication.',
  );
}

export function createFailedRecoveringProofError() {
  return new MagicAdminSDKError(
    ErrorCode.FailedRecoveryProof,
    'Failed to recover proof. Request failed authentication.',
  );
}

export function createApiKeyMissingError() {
  return new MagicAdminSDKError(
    ErrorCode.ApiKeyMissing,
    'Please provide a secret Fortmatic API key that you acquired from the developer dashboard.',
  );
}

export function createMalformedTokenError() {
  return new MagicAdminSDKError(ErrorCode.MalformedTokenError, 'The DID token is malformed or failed to parse.');
}
