export interface MagicAdminSDKAdditionalConfiguration {
  endpoint?: string;
  clientId?: string | null;
}

export interface MagicWallet {
  network: string | null;
  publicAddress: string | null;
  walletType: string | null;
}

export interface MagicUserMetadata {
  issuer: string | null;
  publicAddress: string | null;
  email: string | null;
  oauthProvider: string | null;
  phoneNumber: string | null;
  username: string | null;
  wallets: MagicWallet[] | null;
}
