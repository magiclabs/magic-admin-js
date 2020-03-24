import test from 'ava';
import sinon from 'sinon';
import { createMagicAdminSDK } from '../../../lib/factories';
import { VALID_DIDT, VALID_DIDT_PARSED_CLAIMS } from '../../../lib/constants';

test('#01: Successfully GETs to metadata endpoint via public address', async t => {
  const sdk = createMagicAdminSDK('https://example.com');

  const getMetadataStub = sinon.stub();
  (sdk.users.getMetadataByIssuer as any) = getMetadataStub;

  await sdk.users.getMetadataByToken(VALID_DIDT);

  const getMetadataArguments = getMetadataStub.args[0];
  t.deepEqual(getMetadataArguments, [VALID_DIDT_PARSED_CLAIMS.iss]);
});
