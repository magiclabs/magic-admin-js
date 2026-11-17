import { BaseModule } from '../base-module';
import { createApiKeyMissingError, createIncorrectSignerAddressError } from '../../core/sdk-exceptions';
import { post, get } from '../../utils/rest';
import { generateIssuerFromPublicAddress, parsePublicAddressFromIssuer } from '../../utils/issuer';
import { MagicUserMetadata, MagicWallet, WalletType } from '../../types';

export class UsersModule extends BaseModule {
  // --- User logout endpoints

  public async logoutByIssuer(issuer: string): Promise<void> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();
    const body = { issuer };
    await post(`${this.sdk.apiBaseUrl}/v1/admin/user/logout`, this.sdk.secretApiKey, body);
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
    return this.getMetadataByIssuerAndWallet(issuer, WalletType.NONE);
  }

  public async getMetadataByToken(DIDToken: string): Promise<MagicUserMetadata> {
    this.sdk.token.validate(DIDToken);
    const issuer = this.sdk.token.getIssuer(DIDToken);
    const metadata = await this.getMetadataByIssuer(issuer);
    this.assertMetadataMatchesIssuer(metadata, issuer);
    return metadata;
  }

  public async getMetadataByPublicAddress(publicAddress: string): Promise<MagicUserMetadata> {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    return this.getMetadataByIssuer(issuer);
  }

  public async getMetadataByTokenAndWallet(DIDToken: string, walletType: WalletType): Promise<MagicUserMetadata> {
    this.sdk.token.validate(DIDToken);
    const issuer = this.sdk.token.getIssuer(DIDToken);
    const metadata = await this.getMetadataByIssuerAndWallet(issuer, walletType);
    this.assertMetadataMatchesIssuer(metadata, issuer);
    return metadata;
  }

  public async getMetadataByPublicAddressAndWallet(
    publicAddress: string,
    walletType: WalletType,
  ): Promise<MagicUserMetadata> {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    return this.getMetadataByIssuerAndWallet(issuer, walletType);
  }

  public async getMetadataByIssuerAndWallet(issuer: string, walletType: WalletType): Promise<MagicUserMetadata> {
    if (!this.sdk.secretApiKey) throw createApiKeyMissingError();

    const data = await get<{
      issuer: string | null;
      public_address: string | null;
      email: string | null;
      oauth_provider: string | null;
      phone_number: string | null;
      username: string | null;
      wallets: MagicWallet[] | null;
    }>(`${this.sdk.apiBaseUrl}/v1/admin/user`, this.sdk.secretApiKey, { issuer, wallet_type: walletType });

    return {
      issuer: data.issuer ?? null,
      publicAddress: data.public_address ?? null,
      email: data.email ?? null,
      oauthProvider: data.oauth_provider ?? null,
      phoneNumber: data.phone_number ?? null,
      username: data.username ?? null,
      wallets: data.wallets ?? null,
    };
  }

  private assertMetadataMatchesIssuer(metadata: MagicUserMetadata, issuer: string): void {
    if (
      parsePublicAddressFromIssuer(metadata.issuer ?? '') !== parsePublicAddressFromIssuer(issuer)
    ) {
      throw createIncorrectSignerAddressError();
    }
  }
}
