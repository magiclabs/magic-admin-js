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
  createTokenExpiredError,
  createFailedRecoveringProofError,
  createMalformedTokenError,
  createTokenCannotBeUsedYetError,
} from '../../../../src/core/sdk-exceptions';

test('#01: Successfully validates DIDT', async () => {
  const sdk = createMagicAdminSDK();
  expect(() => sdk.token.validate(VALID_DIDT)).not.toThrow();
});

test('#02: Fails when signer address mismatches signature', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createIncorrectSignerAddressError();
  expect(() => sdk.token.validate(INVALID_SIGNER_DIDT)).toThrow(expectedError);
});

test('#03: Fails when given expired token', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenExpiredError();
  expect(() => sdk.token.validate(EXPIRED_DIDT)).toThrow(expectedError);
});

test('#04: Fails when given a token with a future `nbf` timestamp', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenCannotBeUsedYetError();
  expect(() => sdk.token.validate(VALID_FUTURE_MARKED_DIDT)).toThrow(expectedError);
});

test('#05: Fails if signature recovery rejects', async () => {
  const recoverStub = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  (recoverPersonalSignature as any) = recoverStub;

  const sdk = createMagicAdminSDK();
  const expectedError = createFailedRecoveringProofError();
  expect(() => sdk.token.validate(VALID_DIDT)).toThrow(expectedError);
});

test('#06: Fails if decoding token fails', async () => {
  const recoverStub = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  (recoverPersonalSignature as any) = recoverStub;

  const sdk = createMagicAdminSDK();
  const expectedError = createMalformedTokenError();
  expect(() => sdk.token.validate(INVALID_DIDT_MALFORMED_CLAIM)).toThrow(expectedError);
});
