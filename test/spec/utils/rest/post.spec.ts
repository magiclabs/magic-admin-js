import test from 'ava';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { API_KEY } from '../../../lib/constants';
import { post } from '../../../../src/utils/rest';

test('#01: Successfully POSTs to the given endpoint & stringifies body', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(Promise.resolve());
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(post('https://example.com/hello/world', API_KEY, { public_address: '0x0123' }));

  const fetchArguments = fetchStub.args[0];
  t.deepEqual(fetchArguments, [
    'https://example.com/hello/world',
    {
      method: 'POST',
      headers: { 'X-Magic-Secret-key': API_KEY },
      body: '{"public_address":"0x0123"}',
    },
  ]);
});
