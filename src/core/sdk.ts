import { TokenModule } from '../modules/token';
import { UsersModule } from '../modules/users';
import { UtilsModule } from '../modules/utils';
import { MagicAdminSDKAdditionalConfiguration } from '../types';

export class MagicAdminSDK {
  public readonly apiBaseUrl: string;

  /**
   * Contains utilities for interacting with Decentralized Identity Tokens
   * (DIDTs).
   */
  public readonly token: TokenModule;

  /**
   * Contains utilities for interacting with your Magic Authentication user
   * model.
   */
  public readonly users: UsersModule;

  /**
   * Contains general utilities for Magic Admin SDK.
   */
  public readonly utils: UtilsModule;

  constructor(public readonly secretApiKey?: string, options?: MagicAdminSDKAdditionalConfiguration) {
    const endpoint = options?.endpoint ?? 'https://api.magic.link';
    this.apiBaseUrl = endpoint.replace(/\/+$/, '');

    // Assign API Modules
    this.token = new TokenModule(this);
    this.users = new UsersModule(this);
    this.utils = new UtilsModule(this);
  }
}
