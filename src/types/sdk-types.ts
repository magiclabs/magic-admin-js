export interface MagicAdminSDKAdditionalConfiguration {
  endpoint?: string;
}

export interface MagicUserMetadata {
  issuer: string | null;
  publicAddress: string | null;
  email: string | null;
}
