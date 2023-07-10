/* eslint-disable no-underscore-dangle */
import {
  MagicAdminSDKError,
  createTokenExpiredError,
  createIncorrectSignerAddressError,
  createFailedRecoveringProofError,
  createApiKeyMissingError,
  createServiceError,
  createExpectedBearerStringError,
  createTokenCannotBeUsedYetError,
  createAudienceMismatchError,
} from '../../../../src/core/sdk-exceptions';

function errorAssertions(
  error: MagicAdminSDKError,
  expectedCode: string,
  expectedMessage: string,
  expectedData: any[] = [],
) {
  expect(error instanceof MagicAdminSDKError).toBe(true);
  expect(error.code).toBe(expectedCode);
  expect(error.message).toBe(`Magic Admin SDK Error: [${expectedCode}] ${expectedMessage}`);
  expect(error.data).toEqual(expectedData);
}

test('Creates `ERROR_DIDT_EXPIRED` error', async () => {
  const error = createTokenExpiredError();
  errorAssertions(error, 'ERROR_DIDT_EXPIRED', 'DID Token has expired. Request failed authentication.');
});

test('Creates `ERROR_DIDT_CANNOT_BE_USED_YET` error', async () => {
  const error = createTokenCannotBeUsedYetError();
  errorAssertions(
    error,
    'ERROR_DIDT_CANNOT_BE_USED_YET',
    'Given DID Token cannot be used at this time. Please check the `nbf` field and regenerate a new token with a suitable value.',
  );
});

test('Creates `ERROR_INCORRECT_SIGNER_ADDR` error', async () => {
  const error = createIncorrectSignerAddressError();
  errorAssertions(
    error,
    'ERROR_INCORRECT_SIGNER_ADDR',
    'Incorrect signer address for DID Token. Request failed authentication.',
  );
});

test('Creates `ERROR_FAILED_RECOVERING_PROOF` error', async () => {
  const error = createFailedRecoveringProofError();
  errorAssertions(error, 'ERROR_FAILED_RECOVERING_PROOF', 'Failed to recover proof. Request failed authentication.');
});

test('Creates `ERROR_SECRET_API_KEY_MISSING` error', async () => {
  const error = createApiKeyMissingError();
  errorAssertions(
    error,
    'ERROR_SECRET_API_KEY_MISSING',
    'Please provide a secret Magic API key that you acquired from the developer dashboard.',
  );
});

test('Creates `SERVICE_ERROR` error with empty `data` property', async () => {
  const error = createServiceError();
  errorAssertions(
    error,
    'SERVICE_ERROR',
    'A service error occurred while communicating with the Magic API. Check the `data` key of this error object to see nested errors with additional context.',
  );
});

test('Creates `SERVICE_ERROR` error with non-empty `data` property', async () => {
  const error = createServiceError('hello', 'world');
  errorAssertions(
    error,
    'SERVICE_ERROR',
    'A service error occurred while communicating with the Magic API. Check the `data` key of this error object to see nested errors with additional context.',
    ['hello', 'world'],
  );
});

test('Creates `EXPECTED_BEARER_STRING` error', async () => {
  const error = createExpectedBearerStringError();
  errorAssertions(error, 'EXPECTED_BEARER_STRING', 'Expected argument to be a string in the `Bearer {token}` format.');
});

test('Creates `AUDIENCE_MISMATCH` error', async () => {
  const error = createAudienceMismatchError();
  errorAssertions(
    error,
    'ERROR_AUDIENCE_MISMATCH',
    'Audience does not match client ID. Please ensure your secret key matches the application which generated the DID token.',
  );
});
