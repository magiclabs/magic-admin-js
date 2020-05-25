import { BaseModule } from '../base-module';
import { createExpectedBearerStringError } from '../../core/sdk-exceptions';

export class UtilsModule extends BaseModule {
  /**
   * Parse a raw DID Token from the given Authorization header.
   */
  public parseAuthorizationHeader(header: string) {
    if (!header.toLowerCase().startsWith('bearer ')) {
      throw createExpectedBearerStringError();
    }

    return header.substring(7);
  }
}
