export interface MagicAdminSDKAdditionalConfiguration {
  endpoint?: string;
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
  wallets: MagicWallet[] | null;
}
