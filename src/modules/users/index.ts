import fetch from 'node-fetch';
import { BaseModule } from '../base-module';
import { createApiKeyMissingError } from '../../core/sdk-exceptions';

export class UsersModule extends BaseModule {
  public async logoutByPublicAddress(public_address: string) {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const body = JSON.stringify({ public_address });

    return fetch(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, {
      method: 'POST',
      headers: { 'X-Magic-Secret-key': this.sdk.secretApiKey },
      body,
    });
  }

  public async logoutByToken(DIDToken: string) {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const public_address = this.sdk.token.getPublicAddress(DIDToken);
    const body = JSON.stringify({ public_address });

    return fetch(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, {
      method: 'POST',
      headers: { 'X-Magic-Secret-key': this.sdk.secretApiKey },
      body,
    });
  }

  public async logoutByIssuer(issuer: string) {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const body = JSON.stringify({ public_address: issuer.split(':')[2] });

    return fetch(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, {
      method: 'POST',
      headers: { 'X-Magic-Secret-key': this.sdk.secretApiKey },
      body,
    });
  }
}
