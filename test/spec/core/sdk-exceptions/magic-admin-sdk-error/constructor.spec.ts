import { MagicAdminSDKError } from '../../../../../src/core/sdk-exceptions';

test('Instantiates `MagicAdminSDKError` with empty `data` property', () => {
  const error = new MagicAdminSDKError('TEST_CODE' as any, 'test message');
  expect(error instanceof MagicAdminSDKError).toBe(true);
  expect(error.message).toBe('Magic Admin SDK Error: [TEST_CODE] test message');
  expect(error.code).toBe('TEST_CODE');
  expect(error.data).toEqual([]);
});

test('Instantiates `MagicAdminSDKError` with non-empty `data` property', () => {
  const error = new MagicAdminSDKError('TEST_CODE' as any, 'test message', ['hello world']);
  expect(error instanceof MagicAdminSDKError).toBe(true);
  expect(error.message).toBe('Magic Admin SDK Error: [TEST_CODE] test message');
  expect(error.code).toBe('TEST_CODE');
  expect(error.data).toEqual(['hello world']);
});
