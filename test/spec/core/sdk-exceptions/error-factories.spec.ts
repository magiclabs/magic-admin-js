/* eslint-disable no-underscore-dangle */

import test, { ExecutionContext } from 'ava';
import {
  MagicAdminSDKError,
  createTokenExpiredError,
  createIncorrectSignerAddressError,
  createFailedRecoveringProofError,
  createApiKeyMissingError,
  createServiceError,
} from '../../../../src/core/sdk-exceptions';

function errorAssertions<T extends ExecutionContext<any>>(
  t: T,
  error: MagicAdminSDKError,
  expectedCode: string,
  expectedMessage: string,
  expectedData: any[] = [],
) {
  t.true(error instanceof MagicAdminSDKError);
  t.is(error.code, expectedCode);
  t.is(error.message, `Magic Admin SDK Error: [${expectedCode}] ${expectedMessage}`);
  t.deepEqual(error.data, expectedData);
}

test('#01: Creates `ERROR_DIDT_EXPIRED` error', async t => {
  const error = createTokenExpiredError();
  errorAssertions(t, error, 'ERROR_DIDT_EXPIRED', 'DID Token has expired. Request failed authentication.');
});

test('#02: Creates `ERROR_INCORRECT_SIGNER_ADDR` error', async t => {
  const error = createIncorrectSignerAddressError();
  errorAssertions(
    t,
    error,
    'ERROR_INCORRECT_SIGNER_ADDR',
    'Incorrect signer address for DID Token. Request failed authentication.',
  );
});

test('#03: Creates `ERROR_FAILED_RECOVERING_PROOF` error', async t => {
  const error = createFailedRecoveringProofError();
  errorAssertions(t, error, 'ERROR_FAILED_RECOVERING_PROOF', 'Failed to recover proof. Request failed authentication.');
});

test('#04: Creates `ERROR_SECRET_API_KEY_MISSING` error', async t => {
  const error = createApiKeyMissingError();
  errorAssertions(
    t,
    error,
    'ERROR_SECRET_API_KEY_MISSING',
    'Please provide a secret Fortmatic API key that you acquired from the developer dashboard.',
  );
});

test('#05: Creates `SERVICE_ERROR` error with empty `data` property', async t => {
  const error = createServiceError();
  errorAssertions(
    t,
    error,
    'SERVICE_ERROR',
    'A service error occurred while communicating with the Magic API. Check the `data` key of this error object to see nested errors with additional context.',
  );
});

test('#06: Creates `SERVICE_ERROR` error with non-empty `data` property', async t => {
  const error = createServiceError('hello', 'world');
  errorAssertions(
    t,
    error,
    'SERVICE_ERROR',
    'A service error occurred while communicating with the Magic API. Check the `data` key of this error object to see nested errors with additional context.',
    ['hello', 'world'],
  );
});
