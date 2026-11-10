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

test('Throws error if `ext` is not a finite number', async () => {
  const claim = JSON.stringify({
    iat: 123,
    ext: 'never',
    iss: 'did:ethr:0x0000000000000000000000000000000000000001',
    sub: 'sub',
    aud: 'aud',
    nbf: 123,
    tid: 'tid',
    add: '0x00',
  });
  const token = Buffer.from(JSON.stringify(['0x00', claim])).toString('base64');
  const expectedError = createMalformedTokenError();
  expect(() => parseDIDToken(token)).toThrow(expectedError);
});
