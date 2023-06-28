import { createMagicAdminSDK } from '../../../lib/factories';
import {
  VALID_DIDT,
  VALID_DIDT_WITH_INVALID_RECOVERY_BIT,
  INVALID_SIGNER_DIDT,
  EXPIRED_DIDT,
  INVALID_DIDT_MALFORMED_CLAIM,
  VALID_FUTURE_MARKED_DIDT,
  VALID_ATTACHMENT_DIDT,
} from '../../../lib/constants';
import {
  createIncorrectSignerAddressError,
  createTokenExpiredError,
  createFailedRecoveringProofError,
  createMalformedTokenError,
  createTokenCannotBeUsedYetError,
  createAudienceMismatchError,
} from '../../../../src/core/sdk-exceptions';

test('Successfully validates DIDT', async () => {
  const sdk = createMagicAdminSDK(undefined, 'did:magic:f54168e9-9ce9-47f2-81c8-7cb2a96b26ba');
  expect(() => sdk.token.validate(VALID_DIDT)).not.toThrow();
});

test('Successfully validates DIDT without checking audience', async () => {
  const sdk = createMagicAdminSDK();
  expect(() => sdk.token.validate(VALID_DIDT)).not.toThrow();
});

test('Successfully validates DIDT with attachment', async () => {
  const sdk = createMagicAdminSDK();
  expect(() => sdk.token.validate(VALID_ATTACHMENT_DIDT, 'ravi@magic.link')).not.toThrow();
});

test('Fails when signer address mismatches signature', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createIncorrectSignerAddressError();
  expect(() => sdk.token.validate(INVALID_SIGNER_DIDT)).toThrow(expectedError);
});

test('Fails when given expired token', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenExpiredError();
  expect(() => sdk.token.validate(EXPIRED_DIDT)).toThrow(expectedError);
});

test('Fails when given a token with a future `nbf` timestamp', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createTokenCannotBeUsedYetError();
  expect(() => sdk.token.validate(VALID_FUTURE_MARKED_DIDT)).toThrow(expectedError);
});

test('Fails if signature recovery rejects', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createFailedRecoveringProofError();
  expect(() => sdk.token.validate(VALID_DIDT_WITH_INVALID_RECOVERY_BIT)).toThrow(expectedError);
});

test('Fails if decoding token fails', async () => {
  const sdk = createMagicAdminSDK();
  const expectedError = createMalformedTokenError();
  expect(() => sdk.token.validate(INVALID_DIDT_MALFORMED_CLAIM)).toThrow(expectedError);
});

test('Fails if aud is incorrect', async () => {
  const sdk = createMagicAdminSDK(undefined, 'different');
  const expectedError = createAudienceMismatchError();
  expect(() => sdk.token.validate(VALID_DIDT)).toThrow(expectedError);
});
