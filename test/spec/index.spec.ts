import * as MagicAdmin from '../../src/index';

describe('MagicAdmin', () => {
  it('should have exports', () => {
    expect(MagicAdmin).toEqual(expect.any(Object));
  });

  it('should not have undefined exports', () => {
    for (const k of Object.keys(MagicAdmin))
      expect(MagicAdmin).not.toHaveProperty(k, undefined);
  });
});