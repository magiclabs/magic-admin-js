import test from 'ava';
import { MagicAdminSDK } from '../../../../src/admin-sdk/core/sdk';
import { BaseModule } from '../../../../src/admin-sdk/modules/base-module';
import { createMagicAdminSDK } from '../../../lib/factories';

test.serial('#01: Initializes `BaseModule`', t => {
  const sdk = createMagicAdminSDK();

  const baseModule: any = new (BaseModule as any)(sdk);

  t.true(baseModule instanceof BaseModule);
  t.true(baseModule.sdk instanceof MagicAdminSDK);
});
