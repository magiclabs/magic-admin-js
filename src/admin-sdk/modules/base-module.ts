import { MagicAdminSDK } from '../core/sdk';

export abstract class BaseModule {
  constructor(protected readonly sdk: MagicAdminSDK) {}
}
