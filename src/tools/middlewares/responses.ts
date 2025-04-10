import { Request, Response, NextFunction } from 'express';
import { IApplicationError } from '../../types';
import { ApplicationError } from '../../errors';

export const success = (req: Request, res: Response, next: NextFunction) => (
  payload: any
): void => {
  res.json({
    status: 'success',
    links: {
      self: req.url
    },
    payload: payload
  });
};

export const fail = (req: Request, res: Response, next: NextFunction) => (
  error: IApplicationError | IApplicationError[] | Error
): Response<void> => {
  if (error instanceof Error && !('status' in error)) {
    res.error(error);
    return;
  }

  const errArray = Array.isArray(error) ? error : [error];
  const firstError = errArray[0] as IApplicationError;
  res.status(firstError.status || 400).json({
    status: 'fail',
    errors: errArray
  });
};

export const error = (req: Request, res: Response, next: NextFunction) => (
  err
): void => {
  res.status(500).json({
    status: 'error',
    errors: [
      {
        status: 'error',
        title: err.title || 'Unexpected error',
        message: err.message,
        error: err,
        source: {
          pointer:
            process.env.NODE_ENV === 'development' ? err.stack : undefined,
          parameters: {
            query: req.query,
            body: req.body,
            headers: req.headers
          }
        }
      }
    ]
  });
};

export default (req: Request, res: Response, next: NextFunction): void => {
  res.success = success(req, res, next);
  res.fail = fail(req, res, next);
  res.error = error(req, res, next);
  return next();
};
