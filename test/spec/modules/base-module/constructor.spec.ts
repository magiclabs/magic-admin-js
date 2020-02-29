/* eslint-disable no-new */

import test from 'ava';
import { MagicAdminSDK } from '../../../../src/admin-sdk/core/sdk';
import { BaseModule } from '../../../../src/admin-sdk/modules/base-module';
import { API_KEY } from '../../../lib/constants';

test.serial('#01: Initializes `BaseModule`', t => {
  const sdk = new MagicAdminSDK(API_KEY);

  const baseModule: any = new (BaseModule as any)(sdk);

  t.true(baseModule instanceof BaseModule);
  t.true(baseModule.sdk instanceof MagicAdminSDK);
});
