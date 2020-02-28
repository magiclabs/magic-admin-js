export enum ErrorCode {
  MissingAuthHeader = 'ERROR_MISSING_AUTH_HEADER',
  TokenExpired = 'ERROR_DIDT_EXPIRED',
  IncorrectSignerAddress = 'ERROR_INCORRECT_SIGNER_ADDR',
  FailedRecoveryProof = 'ERROR_FAILED_RECOVERING_PROOF',
  ApiKeyMissing = 'ERROR_SECRET_API_KEY_MISSING',
}
