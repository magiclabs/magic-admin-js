import * as codec from '../../../src/utils/codec';
import { DECODED_DIDT, VALID_DIDT } from '../../lib/constants';

test('Decoding', async () => {
  const decodedString = codec.decodeValue(VALID_DIDT);

  expect(decodedString).toBe(DECODED_DIDT);
});

test('Decoding malformed string', async () => {
  const decodedString = codec.decodeValue(`tRollGoat${VALID_DIDT}`);

  expect(decodedString).not.toBe(DECODED_DIDT);
});

test('Decoding null value', async () => {
  const decodedString = codec.decodeValue(null);

  expect(decodedString).toBe('');
});

test('Decoding undefined', async () => {
  const decodedString = codec.decodeValue(undefined);

  expect(decodedString).toBe('');
});

it('should return decoded value if running in browser', () => {
  // Mocking the window object
  (global as any).window = {
    atob: jest.fn().mockReturnValue(DECODED_DIDT) // Mocking atob method
  };

  jest.spyOn(codec, 'isBrowser').mockReturnValue(true);

  expect(codec.decodeValue(VALID_DIDT)).toBe(DECODED_DIDT);
});