import { MiddlewaresModule } from '../modules/middlewares';
import { TokenModule } from '../modules/token';
import { UsersModule } from '../modules/users';
import { MagicAdminSDKAdditionalConfiguration } from '../types';

export class MagicAdminSDK {
  public readonly apiBaseUrl: string;

  /**
   * Contains token validation middlewares for various NodeJS server frameworks.
   */
  public readonly middlewares: MiddlewaresModule;

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

  constructor(public readonly secretApiKey: string, options?: MagicAdminSDKAdditionalConfiguration) {
    const endpoint = options?.endpoint ?? 'https://api.fortmatic.com';
    this.apiBaseUrl = endpoint.replace(/\/+$/, '');

    // Assign API Modules
    this.middlewares = new MiddlewaresModule(this);
    this.token = new TokenModule(this);
    this.users = new UsersModule(this);
  }
}
