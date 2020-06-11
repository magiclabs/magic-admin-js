import test from 'ava';
import sinon from 'sinon';
import { recoverPersonalSignature } from 'eth-sig-util';
import { createMagicAdminSDK } from '../../../lib/factories';
import {
  VALID_DIDT,
  INVALID_SIGNER_DIDT,
  EXPIRED_DIDT,
  INVALID_DIDT_MALFORMED_CLAIM,
  VALID_FUTURE_MARKED_DIDT,
} from '../../../lib/constants';
import {
  createIncorrectSignerAddressError,
  MagicAdminSDKError,
  createTokenExpiredError,
  createFailedRecoveringProofError,
  createMalformedTokenError,
  createTokenCannotBeUsedYetError,
} from '../../../../src/core/sdk-exceptions';

test.serial('#01: Successfully validates DIDT', async t => {
  const sdk = createMagicAdminSDK();
  t.notThrows(() => sdk.token.validate(VALID_DIDT));
});

test.serial('#02: Fails when signer address mismatches signature', async t => {
  const sdk = createMagicAdminSDK();
  const expectedError = createIncorrectSignerAddressError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.validate(INVALID_SIGNER_DIDT));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});

test.serial('#03: Fails when given expired token', async t => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenExpiredError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.validate(EXPIRED_DIDT));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});

test.serial('#04: Fails when given a token with a future `nbf` timestamp', async t => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenCannotBeUsedYetError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.validate(VALID_FUTURE_MARKED_DIDT));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});

test.serial('#05: Fails if signature recovery rejects', async t => {
  const recoverStub = sinon.stub().throws();
  (recoverPersonalSignature as any) = recoverStub;

  const sdk = createMagicAdminSDK();
  const expectedError = createFailedRecoveringProofError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.validate(VALID_DIDT));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});

test.serial('#06: Fails if decoding token fails', async t => {
  const recoverStub = sinon.stub().throws();
  (recoverPersonalSignature as any) = recoverStub;

  const sdk = createMagicAdminSDK();
  const expectedError = createMalformedTokenError();
  const error: MagicAdminSDKError = t.throws(() => sdk.token.validate(INVALID_DIDT_MALFORMED_CLAIM));
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
