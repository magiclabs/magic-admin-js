import { API_FULL_URL, API_KEY } from './constants';
import { MagicAdminSDK } from '../../src/core/sdk';

export function createMagicAdminSDK(endpoint = API_FULL_URL) {
  return new MagicAdminSDK(API_KEY, { endpoint });
}
