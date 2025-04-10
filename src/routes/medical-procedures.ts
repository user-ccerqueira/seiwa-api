import express, { Request, Response } from 'express';
import sequelize, { User } from '../models';
import { MedicalProceduresRepository } from '../repositories';
import Log from '../tools/log';

const isNumber = (value: any): boolean => !isNaN(Number(value));
const isValidStatus = (status: string): boolean => ['pago', 'pendente', 'glosado'].includes(status.toLowerCase());
const isValidDate = (dateStr: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime());

const toLocalMidnight = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // mês é 0-based
};

export default (passport) => {
  const Router = express.Router();
  const medicalProceduresRepository = new MedicalProceduresRepository();
  Router.use(passport.authenticate('jwt', { session: true }));

  
  Router.get('/all', async (req: Request, res: Response): Promise<void> => {
    try {
      const procedures = await medicalProceduresRepository.getAll();
      res.json(procedures);
      return;
    } catch (err) {
      Log.error(err);
      res.error(err);
      return;
    }
  });

  Router.post('/create-procedure', async (req: Request, res: Response): Promise<void> => {
    const { clientId, patientId, procedureValue, paymentStatus, procedureDate } = req.body;
  
    const validations = [
      { valid: isNumber(clientId), error: 'clientId deve ser um número válido.', code: 4001 },
      { valid: isNumber(patientId), error: 'patientId deve ser um número válido.', code: 4002 },
      { valid: isNumber(procedureValue), error: 'procedureValue deve ser um número válido.', code: 4003 },
      { valid: isValidStatus(paymentStatus), error: 'paymentStatus deve ser "pago", "pendente" ou "glosado".', code: 4004 },
      { valid: isValidDate(procedureDate), error: 'procedureDate deve estar no formato "yyyy-mm-dd" e ser uma data válida.', code: 4005 },
    ];
  
    for (const { valid, error, code } of validations) {
      if (!valid) {
        res.status(400).json({ error, code });
        return;
      }
    }
  
    const finishTransaction = await sequelize.transaction();
    try {
      const data = {
        clientId: Number(clientId),
        patientId: Number(patientId),
        procedureValue: Number(procedureValue),
        paymentStatus,
        procedureDate: toLocalMidnight(procedureDate),
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const procedure = await medicalProceduresRepository.createProduct(data, finishTransaction);
  
      await finishTransaction.commit();     
      res.status(201).json({ msg : "Procedimento criado com sucesso!"});;
      return;
      
    } catch (err) {
      await finishTransaction.rollback();
      Log.error('/:' + err);
      res.error(err);
    }
  });

  return Router;
};
