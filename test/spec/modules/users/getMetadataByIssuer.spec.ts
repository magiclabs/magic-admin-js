import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { API_KEY } from '../../../lib/constants';
import { createApiKeyMissingError, MagicAdminSDKError } from '../../../../src/core/sdk-exceptions';
import { get } from '../../../../src/utils/rest';

const successRes = Promise.resolve({ issuer: 'foo', public_address: 'bar', email: 'baz' });
const nullRes = Promise.resolve({});

test('#01: Successfully GETs to metadata endpoint via issuer', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getStub = sinon.stub();
  getStub.returns(successRes);
  (get as any) = getStub;

  const result = await sdk.users.getMetadataByIssuer('did:ethr:0x1234');

  const getArguments = getStub.args[0];
  t.deepEqual(getArguments, ['https://example.com/v1/admin/auth/user/get', API_KEY, { issuer: 'did:ethr:0x1234' }]);
  t.deepEqual(result, {
    issuer: 'foo',
    publicAddress: 'bar',
    email: 'baz',
  });
});

test('#02: Successfully GETs `null` metadata endpoint via issuer', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getStub = sinon.stub();
  getStub.returns(nullRes);
  (get as any) = getStub;

  const result = await sdk.users.getMetadataByIssuer('did:ethr:0x1234');

  const getArguments = getStub.args[0];
  t.deepEqual(getArguments, ['https://example.com/v1/admin/auth/user/get', API_KEY, { issuer: 'did:ethr:0x1234' }]);
  t.deepEqual(result, {
    issuer: null,
    publicAddress: null,
    email: null,
  });
});

test('#03: Fails GET if API key is missing', async t => {
  const sdk = createMagicAdminSDK('https://example.com');
  (sdk as any).secretApiKey = undefined;

  const getStub = sinon.stub();
  (get as any) = getStub;

  const expectedError = createApiKeyMissingError();

  const error: MagicAdminSDKError = await t.throwsAsync(sdk.users.getMetadataByIssuer('did:ethr:0x1234'));

  t.false(getStub.called);
  t.is(error.code, expectedError.code);
  t.is(error.message, expectedError.message);
});
