import test from 'ava';
import { MagicAdminSDKError } from '../../../../../src/core/sdk-exceptions';

test('#01: Instantiates `MagicAdminSDKError`', t => {
  const error = new MagicAdminSDKError('TEST_CODE' as any, 'test message');
  t.true(error instanceof MagicAdminSDKError);
  t.is(error.message, 'Magic Admin SDK Error: [TEST_CODE] test message');
  t.is(error.code, 'TEST_CODE');
});
