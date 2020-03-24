import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';

test('#01: Successfully GETs to metadata endpoint via public address', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const logoutStub = sinon.stub();
  logoutStub.returns(Promise.resolve());
  (sdk.users.logoutByIssuer as any) = logoutStub;

  await t.notThrowsAsync(sdk.users.logoutByToken(VALID_DIDT));

  const logoutArguments = logoutStub.args[0];
  t.deepEqual(logoutArguments, [VALID_DIDT_PARSED_CLAIMS.iss]);
});
