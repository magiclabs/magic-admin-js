import { decodeValue } from '../../../src/utils/codec';
import { DECODED_DIDT, VALID_DIDT } from '../../lib/constants';

test('Decoding', async () => {
  const decodedString = decodeValue(VALID_DIDT);

  expect(decodedString).toBe(DECODED_DIDT);
});

test('Decoding malformed string', async () => {
  const decodedString = decodeValue(`tRollGoat${VALID_DIDT}`);

  expect(decodedString).not.toBe(DECODED_DIDT);
});

test('Decoding null value', async () => {
  const decodedString = decodeValue(null);

  expect(decodedString).toBe('');
});

test('Decoding undefined', async () => {
  const decodedString = decodeValue(undefined);

  expect(decodedString).toBe('');
});
