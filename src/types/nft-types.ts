export interface MintRequestData {
  requestId: string;
}

export interface MintRequest {
  data: MintRequestData;
  error_code: string;
  message: string;
  status: string;
}

export interface ValidateTokenOwnershipResponse {
  valid: boolean;
  error_code: string;
  message: string;
}