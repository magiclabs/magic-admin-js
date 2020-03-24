import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';

test('#01: Successfully GETs to metadata endpoint via public address', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const logoutStub = sinon.stub();
  logoutStub.returns(Promise.resolve());
  (sdk.users.logoutByIssuer as any) = logoutStub;

  await t.notThrowsAsync(sdk.users.logoutByPublicAddress('0x1234'));

  const logoutArguments = logoutStub.args[0];
  t.deepEqual(logoutArguments, ['did:ethr:0x1234']);
});
