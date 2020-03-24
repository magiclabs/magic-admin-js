import test from 'ava';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { API_KEY } from '../../../lib/constants';
import { get } from '../../../../src/utils/rest';

test('#01: Successfully GETs to the given endpoint & stringifies query params', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(Promise.resolve());
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(get('https://example.com/hello/world', API_KEY, { foo: 'hello', bar: 'world' }));

  const fetchArguments = fetchStub.args[0];
  t.deepEqual(fetchArguments, [
    'https://example.com/hello/world?foo=hello&bar=world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});

test('#01: Successfully GETs to the given endpoint with no query params', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(Promise.resolve());
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(get('https://example.com/hello/world', API_KEY));

  const fetchArguments = fetchStub.args[0];
  t.deepEqual(fetchArguments, [
    'https://example.com/hello/world',
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': API_KEY },
    },
  ]);
});
