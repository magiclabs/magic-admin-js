import test from 'ava';
import sinon from 'sinon';
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

test('#01: Successfully GETs to the given endpoint & stringifies query params', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(successRes);
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(async () => {
    const result = await get('https://example.com/hello/world', API_KEY, { foo: 'hello', bar: 'world' });
    t.is(result, 'hello world');
  });

  const fetchArguments = fetchStub.args[0];
  t.deepEqual(fetchArguments, [
    'https://example.com/hello/world?foo=hello&bar=world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});

test('#02: Successfully GETs to the given endpoint with no query params', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(successRes);
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(async () => {
    const result = await get('https://example.com/hello/world', API_KEY);
    t.is(result, 'hello world');
  });

  const fetchArguments = fetchStub.args[0];
  t.deepEqual(fetchArguments, [
    'https://example.com/hello/world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});
