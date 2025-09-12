import { API_KEY } from '../../../lib/constants';
import { post } from '../../../../src/utils/rest';

const successRes = Promise.resolve({
  json: () =>
    Promise.resolve({
      message: 'hello world',
    }),
});

jest.mock('../../../../src/utils/fetch', () => ({
  fetch: jest.fn(),
}));

test('Successfully POSTs to the given endpoint & stringifies body', async () => {
  const { fetch } = require('../../../../src/utils/fetch');
  const fetchStub = jest.fn().mockImplementation(() => successRes);
  fetch.mockImplementation(fetchStub);

  await expect(post('https://example.com/hello/world', API_KEY, { public_address: '0x0123' })).resolves.toEqual({
    message: 'hello world',
  });

  const fetchArguments = fetchStub.mock.calls[0];
  expect(fetchArguments).toEqual([
    'https://example.com/hello/world',
    {
      method: 'POST',
      headers: { 'X-Magic-Secret-key': API_KEY },
      body: '{"public_address":"0x0123"}',
    },
  ]);
});
