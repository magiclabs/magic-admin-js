import { MagicAdminSDK } from '../core/sdk';

export class BaseModule {
  constructor(protected readonly sdk: MagicAdminSDK) {}
}
