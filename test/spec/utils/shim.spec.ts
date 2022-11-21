import atob from 'atob';

test('Shim overwrites undefined global atob', async () => {
  globalThis.atob = undefined;

  expect(globalThis.atob).toBeUndefined();

  // eslint-disable-next-line global-require
  require('../../../src/utils/shim');

  expect(globalThis.atob).toBe(atob);
});

test('Shim does not overwrite exisiting atob', async () => {
  const dummyFunc = () => '';
  globalThis.atob = dummyFunc;

  expect(globalThis.atob).toBe(dummyFunc);

  // eslint-disable-next-line global-require
  require('../../../src/utils/shim');

  expect(globalThis.atob).toBe(dummyFunc);
});
