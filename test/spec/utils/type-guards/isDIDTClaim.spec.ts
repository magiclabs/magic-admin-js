import { isDIDTClaim } from '../../../../src/utils/type-guards';

test('Returns false given `undefined`', async () => {
  expect(isDIDTClaim(undefined)).toBe(false);
});

test('Returns false given `null`', async () => {
  expect(isDIDTClaim(null)).toBe(false);
});

test('Returns false given without `Claim.iat`', async () => {
  expect(isDIDTClaim({ ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.ext`', async () => {
  expect(isDIDTClaim({ iat: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.iss`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.sub`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.aud`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.nbf`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', tid: 'asdf', add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.tid`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, add: '0x0123' })).toBe(
    false,
  );
});

test('Returns false given without `Claim.add`', async () => {
  expect(isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf' })).toBe(false);
});

test('Returns true given with all required properties', async () => {
  expect(
    isDIDTClaim({ iat: 123, ext: 123, iss: 'asdf', sub: 'asdf', aud: 'asdf', nbf: 123, tid: 'asdf', add: '0x0123' }),
  ).toBe(true);
});
