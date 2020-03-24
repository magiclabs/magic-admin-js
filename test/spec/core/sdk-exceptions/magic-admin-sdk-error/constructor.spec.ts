import test from 'ava';
import { MagicAdminSDKError } from '../../../../../src/core/sdk-exceptions';

test('#01: Instantiates `MagicAdminSDKError` with empty `data` property', t => {
  const error = new MagicAdminSDKError('TEST_CODE' as any, 'test message');
  t.true(error instanceof MagicAdminSDKError);
  t.is(error.message, 'Magic Admin SDK Error: [TEST_CODE] test message');
  t.is(error.code, 'TEST_CODE');
  t.deepEqual(error.data, []);
});

test('#01: Instantiates `MagicAdminSDKError` with non-empty `data` property', t => {
  const error = new MagicAdminSDKError('TEST_CODE' as any, 'test message', ['hello world']);
  t.true(error instanceof MagicAdminSDKError);
  t.is(error.message, 'Magic Admin SDK Error: [TEST_CODE] test message');
  t.is(error.code, 'TEST_CODE');
  t.deepEqual(error.data, ['hello world']);
});
