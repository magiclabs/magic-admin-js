import { MagicAdminSDK } from '../../../../src/core/sdk';
import { BaseModule } from '../../../../src/modules/base-module';
import { createMagicAdminSDK } from '../../../lib/factories';

test('Initializes `BaseModule`', () => {
  const sdk = createMagicAdminSDK();

  const baseModule: any = new (BaseModule as any)(sdk);

  expect(baseModule instanceof BaseModule).toBe(true);
  expect(baseModule.sdk instanceof MagicAdminSDK).toBe(true);
});
