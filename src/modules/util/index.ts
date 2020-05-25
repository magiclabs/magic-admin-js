import { BaseModule } from '../base-module';
import { createExpectedBearerStringError } from '../../core/sdk-exceptions';

export class UtilModule extends BaseModule {
  public parseTokenFromBearerString(header: string) {
    if (!header.toLowerCase().startsWith('bearer ')) {
      throw createExpectedBearerStringError();
    }

    return header.substring(7);
  }
}
