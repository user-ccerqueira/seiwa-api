import express, { Request, Response, Router } from 'express';
import DashboardService from '../repositories/indeicators.repository';
import {
  MedicalProcedure
} from '../models';
import { Authenticator } from 'passport';
import { Op } from 'sequelize';

export default (passport: Authenticator): Router => {
  const Router = express.Router();

  Router.use(passport.authenticate('jwt', { session: false }));

  Router.post('/daily-procedure-doctor', async (req: Request, res: Response) => {
    try {
      const elements = await DashboardService.getDailyProcedureDoctor();
      res.success(elements);
      return;
    } catch (err) {
      res.error(err);
      return;
    }
  });

  Router.post('/glosses-period', async (req: Request, res: Response) => {
    try {
      const elements = await DashboardService.getGlossesPeriod();
      res.success(elements);
      return;
    } catch (err) {
      res.error(err);
      return;
    }
  });
  
  Router.post('/financial-doctor', async (req: Request, res: Response) => {
    try {
      const elements = await DashboardService.getFinancialDoctor();
      res.success(elements);
      return;
    } catch (err) {
      res.error(err);
      return;
    }
  });  
      

  return Router;
};
