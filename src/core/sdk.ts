import '../utils/shim';
import { TokenModule } from '../modules/token';
import { UsersModule } from '../modules/users';
import { UtilsModule } from '../modules/utils';
import { MagicAdminSDKAdditionalConfiguration } from '../types';
import { get } from '../utils/rest';
import { createApiKeyMissingError } from './sdk-exceptions';

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

  /**
   * Unique client identifier
   */
  public clientId: string | null;

  /**
   * Deprecated. Use `init` instead.
   * @param secretApiKey
   * @param options
   */
  constructor(public readonly secretApiKey?: string, options?: MagicAdminSDKAdditionalConfiguration) {
    const endpoint = options?.endpoint ?? 'https://api.magic.link';
    this.apiBaseUrl = endpoint.replace(/\/+$/, '');
    this.clientId = options?.clientId ?? null;
    // Assign API Modules
    this.token = new TokenModule(this);
    this.users = new UsersModule(this);
    this.utils = new UtilsModule(this);
  }

  public static async init(secretApiKey?: string, options?: MagicAdminSDKAdditionalConfiguration) {
    if (!secretApiKey) throw createApiKeyMissingError();

    let hydratedOptions = options ?? {};

    const endpoint = hydratedOptions.endpoint ?? 'https://api.magic.link';
    const apiBaseUrl = endpoint.replace(/\/+$/, '');

    if (!hydratedOptions.clientId) {
      const resp = await get<{
        client_id: string | null;
        app_scope: string | null;
      }>(`${apiBaseUrl}/v1/admin/client/get`, secretApiKey);
      hydratedOptions = { ...hydratedOptions, clientId: resp.client_id };
    }

    return new MagicAdminSDK(secretApiKey, hydratedOptions);
  }
}
