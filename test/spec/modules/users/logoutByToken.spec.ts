import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, API_KEY } from '../../../lib/constants';
import { createApiKeyMissingError, MagicAdminSDKError } from '../../../../src/core/sdk-exceptions';
import { post } from '../../../../src/utils/rest';

test('#01: Successfully POSTs to logout endpoint via DIDT', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getPublicAddressStub = sinon.stub();
  getPublicAddressStub.returns('0x0123');
  sdk.token.getPublicAddress = getPublicAddressStub;

  const postStub = sinon.stub();
  (post as any) = postStub;

  await t.notThrowsAsync(sdk.users.logoutByToken(VALID_DIDT));

  const fetchArguments = postStub.args[0];
  t.deepEqual(fetchArguments, ['https://example.com/v1/admin/auth/user/logout', API_KEY, { public_address: '0x0123' }]);
});

test('#02: Fails POST if API key is missing', async t => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const getPublicAddressStub = sinon.stub();
  getPublicAddressStub.returns('0x0123');
  sdk.token.getPublicAddress = getPublicAddressStub;

  const fetchStub = sinon.stub();
  (post as any) = fetchStub;

  const expectedError = createApiKeyMissingError();

  const error: MagicAdminSDKError = await t.throwsAsync(sdk.users.logoutByToken(VALID_DIDT));

  t.false(getPublicAddressStub.called);
  t.false(fetchStub.called);
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
