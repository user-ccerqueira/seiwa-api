import { Request, Response, NextFunction } from 'express';
import { IApplicationError } from '../../types';
import Log from '../log';

export default (
  err: Error | IApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof Error) {
    Log.error(err);
    if (res.error) {
      res.error(err); // Caso `res.error` seja uma extensão
    } else {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: 'Erro inesperado' });
  }
  next(); // Chamado para middlewares subsequentes
};
