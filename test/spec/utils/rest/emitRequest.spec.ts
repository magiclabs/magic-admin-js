import { fetch } from '../../../../src/utils/fetch';
import { API_KEY } from '../../../lib/constants';
import { get } from '../../../../src/utils/rest';
import { createServiceError } from '../../../../src/core/sdk-exceptions';

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

test('#01: Fails with TypeError if `res.json` is undefined', async () => {
  // This test allow us to force `fetch` to catch. This test is primarily for
  // coverage purposes. This case should likely never happen.

  const fetchStub = jest.fn().mockImplementation(() => failWithTypeError);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  await expect(get(URL, API_KEY)).rejects.toThrow(expectedError);
});

test('#02: Fails with non-OK status in response JSON', async () => {
  const fetchStub = jest.fn().mockImplementation(() => failWithBadStatus);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  await expect(get(URL, API_KEY)).rejects.toThrow(expectedError);
});

test('#03: Succeeds with empty data in response JSON, returning `{}` as fallback', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successResEmptyData);
  (fetch as any) = fetchStub;
  await expect(get(URL, API_KEY)).resolves.toEqual({});
});

test('#04: Fails with empty status in response', async () => {
  const fetchStub = jest.fn().mockImplementation(() => failWithEmptyStatus);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  expect(get(URL, API_KEY)).rejects.toThrow(expectedError);
});
