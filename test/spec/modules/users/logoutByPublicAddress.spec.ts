import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { API_KEY } from '../../../lib/constants';
import { createApiKeyMissingError, MagicAdminSDKError } from '../../../../src/core/sdk-exceptions';
import { post } from '../../../../src/utils/rest';

test('#01: Successfully POSTs to logout endpoint via DIDT', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const postStub = sinon.stub();
  (post as any) = postStub;

  await t.notThrowsAsync(sdk.users.logoutByPublicAddress('0x0123'));

  const postArguments = postStub.args[0];
  t.deepEqual(postArguments, ['https://example.com/v1/admin/auth/user/logout', API_KEY, { public_address: '0x0123' }]);
});

test('#02: Fails POST if API key is missing', async t => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const postStub = sinon.stub();
  (post as any) = postStub;

  const expectedError = createApiKeyMissingError();

  const error: MagicAdminSDKError = await t.throwsAsync(sdk.users.logoutByPublicAddress('0x0123'));

  t.false(postStub.called);
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
