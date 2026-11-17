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

test('Successfully GETs to the given endpoint with empty query params', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;

  await get('https://example.com/hello/world', API_KEY, {});

  expect(fetchStub.mock.calls[0][0]).toBe('https://example.com/hello/world');
});

test('Encodes reserved characters in query parameter values', async () => {
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  (fetch as any) = fetchStub;

  await get('https://example.com/hello/world', API_KEY, { issuer: 'did:ethr:0x1234:&issuer=value#fragment%+ ' });

  expect(fetchStub.mock.calls[0][0]).toBe(
    'https://example.com/hello/world?issuer=did%3Aethr%3A0x1234%3A%26issuer%3Dvalue%23fragment%25%2B+',
  );
});
