import { Response, RequestHandler } from 'express';
import { RequestUserAttributes, UserAttributes, IApplicationError } from '..';

declare global {
  namespace Express {
    export interface Response {
      success: Function<any>;
      fail: Function<IApplicationError | Error>;
      error: Function<Error>;
    }

    export interface Request {
      id?: any;
      user?: UserAttributes;
      files?: any;
      oauthToken: string;
    }
  }
}
