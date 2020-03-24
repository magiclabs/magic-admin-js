import test from 'ava';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { API_KEY } from '../../../lib/constants';
import { get } from '../../../../src/utils/rest';
import { createServiceError, MagicAdminSDKError } from '../../../../src/core/sdk-exceptions';

/*
  We test remaining code paths to the private function `emitRequest` via the
  public `get` function.
 */

const URL = 'https://example.com/hello/world';

const failWithTypeError = Promise.resolve({
  json: undefined,
});

const failWithBadStatus = Promise.resolve({
  json: () =>
    Promise.resolve({
      status: 'qwerty', // Only 'ok' with succeed
    }),
});

const failWithEmptyStatus = Promise.resolve({
  json: () =>
    Promise.resolve({
      // No status defined will assume non-'ok'
    }),
});

const successResEmptyData = Promise.resolve({
  json: () =>
    Promise.resolve({
      status: 'ok',
    }),
});

test('#01: Fails with TypeError if `res.json` is undefined', async t => {
  // This test allow us to force `fetch` to catch. This test is primarily for
  // coverage purposes. This case should likely never happen.

  const fetchStub = sinon.stub();
  fetchStub.returns(failWithTypeError);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  const err: MagicAdminSDKError = await t.throwsAsync(get(URL, API_KEY));

  t.true(err instanceof MagicAdminSDKError);
  t.is(err.code, expectedError.code);
  t.is(err.message, expectedError.message);
  t.true(err.data[0] instanceof TypeError);
});

test('#02: Fails with non-OK status in response JSON', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(failWithBadStatus);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  const err: MagicAdminSDKError = await t.throwsAsync(get(URL, API_KEY));

  t.true(err instanceof MagicAdminSDKError);
  t.is(err.code, expectedError.code);
  t.is(err.message, expectedError.message);
  t.deepEqual(err.data, [{ status: 'qwerty' }]);
});

test('#03: Succeeds with empty data in response JSON, returning `{}` as fallback', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(successResEmptyData);
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(async () => {
    const result = await get(URL, API_KEY);
    t.deepEqual(result, {});
  });
});

test('#04: Fails with empty status in response', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(failWithEmptyStatus);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  const err: MagicAdminSDKError = await t.throwsAsync(get(URL, API_KEY));

  t.true(err instanceof MagicAdminSDKError);
  t.is(err.code, expectedError.code);
  t.is(err.message, expectedError.message);
  t.deepEqual(err.data, [{}]);
});
