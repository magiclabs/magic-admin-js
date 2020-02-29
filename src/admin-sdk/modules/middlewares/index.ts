import { Request, Response, NextFunction } from 'express';
import { BaseModule } from '../base-module';
import { createMissingAuthHeaderError } from '../../core/sdk-exceptions';

export class MiddlewaresModule extends BaseModule {
  public express = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req?.headers?.authorization;
    if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith('bearer ')) {
      res
        .status(401)
        .send(createMissingAuthHeaderError().message)
        .end();
      return;
    }
    try {
      const DIDToken = authorizationHeader.substring(7); // Strips Bearer
      await this.sdk.token.validate(DIDToken);
      next();
    } catch (err) {
      res
        .status(401)
        .send(err.message)
        .end();
    }
  };
}
