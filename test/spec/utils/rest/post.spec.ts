import test from 'ava';
import sinon from 'sinon';
import fetch from 'node-fetch';
import { API_KEY } from '../../../lib/constants';
import { post } from '../../../../src/utils/rest';

const successRes = Promise.resolve({
  json: () =>
    Promise.resolve({
      data: 'hello world',
      status: 'ok',
    }),
});

test('#01: Successfully POSTs to the given endpoint & stringifies body', async t => {
  const fetchStub = sinon.stub();
  fetchStub.returns(successRes);
  (fetch as any) = fetchStub;

  await t.notThrowsAsync(async () => {
    const result = await post('https://example.com/hello/world', API_KEY, { public_address: '0x0123' });
    t.is(result, 'hello world');
  });

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
