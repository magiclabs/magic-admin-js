import { BaseModule } from '../base-module';
import { createApiKeyMissingError } from '../../core/sdk-exceptions';
import { post, get } from '../../utils/rest';
import { generateIssuerFromPublicAddress, parsePublicAddressFromIssuer } from '../../utils/issuer';
import { MagicUserMetadata } from '../../types';

export class UsersModule extends BaseModule {
  // --- User logout endpoints

  public async logoutByIssuer(issuer: string): Promise<void> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = { issuer };
    await post(`${this.sdk.apiBaseUrl}/v2/admin/auth/user/logout`, this.sdk.secretApiKey, body);
  }

  public async logoutByPublicAddress(publicAddress: string): Promise<void> {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    await this.logoutByIssuer(issuer);
  }

  public async logoutByToken(DIDToken: string): Promise<void> {
    const issuer = this.sdk.token.getIssuer(DIDToken);
    await this.logoutByIssuer(issuer);
  }

  // --- User metadata endpoints

  public async getMetadataByIssuer(issuer: string): Promise<MagicUserMetadata> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const data = await get<{ issuer: string | null; public_address: string | null; email: string | null }>(
      `${this.sdk.apiBaseUrl}/v1/admin/auth/user/get`,
      this.sdk.secretApiKey,
      { issuer },
    );

    return {
      issuer: data.issuer ?? null,
      publicAddress: data.public_address ?? null,
      email: data.email ?? null,
    };
  }

  public async getMetadataByToken(DIDToken: string): Promise<MagicUserMetadata> {
    const issuer = this.sdk.token.getIssuer(DIDToken);
    return this.getMetadataByIssuer(issuer);
  }

  public async getMetadataByPublicAddress(publicAddress: string): Promise<MagicUserMetadata> {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    return this.getMetadataByIssuer(issuer);
  }
}
