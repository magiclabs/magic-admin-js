import { fetch } from '../../../../src/utils/fetch';
import { API_KEY } from '../../../lib/constants';
import { get } from '../../../../src/utils/rest';

const successRes = Promise.resolve({
  json: () =>
    Promise.resolve({
      message: 'hello world',
    }),
});

test('Successfully GETs to the given endpoint & stringifies query params', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;
  await expect(get('https://example.com/hello/world', API_KEY, { foo: 'hello', bar: 'world' })).resolves.toEqual({
    message: 'hello world',
  });

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world?foo=hello&bar=world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-Key': API_KEY },
    },
  ]);
});

test('Successfully GETs to the given endpoint with no query params', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;

  await expect(get('https://example.com/hello/world', API_KEY)).resolves.toEqual({
    message: 'hello world',
  });

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-Key': API_KEY },
    },
  ]);
});


test('URL-encodes query param keys and values', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;

  await expect(get('https://example.com/hello/world', API_KEY, { 'foo bar': 'hello world', redirect: 'https://example.com/callback?a=1&b=2' })).resolves.toEqual({
    message: 'hello world',
  });

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world?foo%20bar=hello%20world&redirect=https%3A%2F%2Fexample.com%2Fcallback%3Fa%3D1%26b%3D2',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-Key': API_KEY },
    },
  ]);
});
