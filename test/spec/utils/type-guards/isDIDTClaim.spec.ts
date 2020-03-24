import test from 'ava';
import { isDIDTClaim } from '../../../../src/utils/type-guards';

test('#01: Returns false given `undefined`', async t => {
  t.false(isDIDTClaim(undefined));
});

test('#02: Returns false given `null`', async t => {
  t.false(isDIDTClaim(null));
});

test('#03: Returns false given without `Claim.iat`', async t => {
  t.false(isDIDTClaim({ ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }));
});

test('#04: Returns false given without `Claim.ext`', async t => {
  t.false(isDIDTClaim({ iat: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }));
});

test('#05: Returns false given without `Claim.iss`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }));
});

test('#06: Returns false given without `Claim.sub`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }));
});

test('#07: Returns false given without `Claim.aud`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }));
});

test('#08: Returns false given without `Claim.nbf`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', tid: 'asdf', add: '0x0123' }));
});

test('#09: Returns false given without `Claim.tid`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, add: '0x0123' }));
});

test('#10: Returns false given without `Claim.add`', async t => {
  t.false(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf' }));
});

test('#11: Returns true given with all required properties', async t => {
  t.true(
    isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }),
  );
});
