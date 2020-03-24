import { BaseModule } from '../base-module';
import { createApiKeyMissingError } from '../../core/sdk-exceptions';
import { post, get } from '../../utils/rest';
import { generateIssuerFromPublicAddress } from '../../utils/issuer-operations';
import { MagicUserMetadata } from '../../types';

export class UsersModule extends BaseModule {
  public async logoutByPublicAddress(public_address: string): Promise<void> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = { public_address };
    await post(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, this.sdk.secretApiKey, body);
  }

  public async logoutByToken(DIDToken: string): Promise<void> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const public_address = this.sdk.token.getPublicAddress(DIDToken);
    const body = { public_address };
    await post(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, this.sdk.secretApiKey, body);
  }

  public async logoutByIssuer(issuer: string): Promise<void> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = { public_address: issuer.split(':')[2] };
    await post(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/logout`, this.sdk.secretApiKey, body);
  }

  public async getMetadataByToken(DIDToken: string): Promise<MagicUserMetadata> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const data = await get(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/get`, this.sdk.secretApiKey, {
      issuer: this.sdk.token.getIssuer(DIDToken),
    })
      .then(res => res.json())
      .then(json => json?.data);

    return {
      issuer: data?.issuer ?? null,
      publicAddress: data?.public_address ?? null,
      email: data?.email ?? null,
    };
  }

  public async getMetadataByIssuer(issuer: string): Promise<MagicUserMetadata> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const data = await get(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/get`, this.sdk.secretApiKey, {
      issuer,
    })
      .then(res => res.json())
      .then(json => json?.data);

    return {
      issuer: data?.issuer ?? null,
      publicAddress: data?.public_address ?? null,
      email: data?.email ?? null,
    };
  }

  public async getMetadataByPublicAddress(publicAddress: string): Promise<MagicUserMetadata> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const data = await get(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/get`, this.sdk.secretApiKey, {
      issuer: generateIssuerFromPublicAddress(publicAddress),
    })
      .then(res => res.json())
      .then(json => json?.data);

    return {
      issuer: data?.issuer ?? null,
      publicAddress: data?.public_address ?? null,
      email: data?.email ?? null,
    };
  }
}
