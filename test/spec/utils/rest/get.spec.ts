import fetch from 'node-fetch';
import { API_KEY } from '../../../lib/constants';
import { get } from '../../../../src/utils/rest';

const successRes = Promise.resolve({
  json: () =>
    Promise.resolve({
      data: 'hello world',
      status: 'ok',
    }),
});

test('#01: Successfully GETs to the given endpoint & stringifies query params', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;
  await expect(get('https://example.com/hello/world', API_KEY, { foo: 'hello', bar: 'world' })).resolves.toBe(
    'hello world',
  );

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world?foo=hello&bar=world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});

test('#02: Successfully GETs to the given endpoint with no query params', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;

  await expect(get('https://example.com/hello/world', API_KEY)).resolves.toBe('hello world');

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});
