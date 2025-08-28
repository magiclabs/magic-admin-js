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
      error: 'Something went wrong',
    }),
});

const failWithEmptyStatus = Promise.resolve({
  json: () =>
    Promise.resolve({}),
});

const successResEmptyData = Promise.resolve({
  json: () =>
    Promise.resolve({}),
});

test('Fails with TypeError if `res.json` is undefined', async () => {
  // This test allow us to force `fetch` to catch. This test is primarily for
  // coverage purposes. This case should likely never happen.

  const fetchStub = jest.fn().mockImplementation(() => failWithTypeError);
  (fetch as any) = fetchStub;

  const expectedError = createServiceError({ status: 'qwerty' });

  await expect(get(URL, API_KEY)).rejects.toThrow(expectedError);
});

test('Returns response with error field', async () => {
  const fetchStub = jest.fn().mockImplementation(() => failWithBadStatus);
  (fetch as any) = fetchStub;

  await expect(get(URL, API_KEY)).resolves.toEqual({
    error: 'Something went wrong',
  });
});

test('Succeeds with empty data in response JSON, returning response without status', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successResEmptyData);
  (fetch as any) = fetchStub;
  await expect(get(URL, API_KEY)).resolves.toEqual({});
});

test('Returns empty response object', async () => {
  const fetchStub = jest.fn().mockImplementation(() => failWithEmptyStatus);
  (fetch as any) = fetchStub;

  await expect(get(URL, API_KEY)).resolves.toEqual({});
});
