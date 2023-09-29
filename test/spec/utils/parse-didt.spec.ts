import { VALID_DIDT, VALID_DIDT_DECODED, INVALID_DIDT_MALFORMED_CLAIM } from '../../lib/constants';
import { createMalformedTokenError } from '../../../src/core/sdk-exceptions';
import { parseDIDToken } from '../../../src/utils/parse-didt';

test('Successfully parses DIDT', async () => {
  const result = parseDIDToken(VALID_DIDT);
  expect(result.withParsedClaim).toEqual(VALID_DIDT_DECODED);
});

test('Throws error if token is malformed', async () => {
  const expectedError = createMalformedTokenError();
  expect(() => parseDIDToken(INVALID_DIDT_MALFORMED_CLAIM)).toThrow(expectedError);
});
