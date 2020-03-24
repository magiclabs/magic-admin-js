import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';

test('#01: Successfully GETs to metadata endpoint via public address', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = sinon.stub();
  getMetadataStub.returns(Promise.resolve());
  (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

  await t.notThrowsAsync(sdk.users.getMetadataByPublicAddress('0x1234'));

  const getMetadataArguments = getMetadataStub.args[0];
  t.deepEqual(getMetadataArguments, ['did:ethr:0x1234']);
});
