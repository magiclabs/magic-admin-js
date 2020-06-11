export enum ErrorCode {
  MissingAuthHeader = 'ERROR_MISSING_AUTH_HEADER',
  TokenExpired = 'ERROR_DIDT_EXPIRED',
  TokenCannotBeUsedYet = 'ERROR_DIDT_CANNOT_BE_USED_YET',
  IncorrectSignerAddress = 'ERROR_INCORRECT_SIGNER_ADDR',
  FailedRecoveryProof = 'ERROR_FAILED_RECOVERING_PROOF',
  ApiKeyMissing = 'ERROR_SECRET_API_KEY_MISSING',
  MalformedTokenError = 'ERROR_MALFORMED_TOKEN',
  ServiceError = 'SERVICE_ERROR',
  ExpectedBearerString = 'EXPECTED_BEARER_STRING',
}
