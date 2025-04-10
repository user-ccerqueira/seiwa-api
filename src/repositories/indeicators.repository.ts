import { Op, Sequelize } from 'sequelize';
import _ from 'lodash';
import {
  MedicalProcedure
} from '../models';

class Dashboard {
  
  static async getDailyProcedureDoctor(): Promise<any> {
    const results = await MedicalProcedure.findAll({
      attributes: [
        [Sequelize.literal('"clientId"'), 'cliente'],
        [Sequelize.fn('DATE', Sequelize.col('"procedureDate"')), 'procedureDate'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'quantidade']
      ],
      group: ['cliente', Sequelize.fn('DATE', Sequelize.col('"procedureDate"'))],
      order: [
        [Sequelize.literal('"procedureDate"'), 'DESC'],
        [Sequelize.literal('quantidade'), 'DESC']
      ],
      raw: true,
    });
  
    const query = results
      .filter((r) => r['cliente'] !== null)
      .map((res) => ({
        cliente: res['cliente'],
        procedureDate: res['procedureDate'],
        quantidade: Number(res['quantidade'])
      }));
  
    return query;
  }

  static async getGlossesPeriod(): Promise<any> {
    const results = await MedicalProcedure.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('"procedureDate"')), 'procedureDate'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'quantidade']
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('"procedureDate"'))],
      order: [
        [Sequelize.literal('"procedureDate"'), 'DESC']
      ],
      raw: true,
      where: {
        paymentStatus: {
          [Op.eq]: 'glosado'
        }
      }     
    });
  
    const query = results
      .filter((r) => r['procedureDate'] !== null)
      .map((res) => ({
        procedureDate: res['procedureDate'],
        quantidade: Number(res['quantidade'])
      }));
  
    return query;    
    
  }
  
  static async getFinancialDoctor(): Promise<any> {
    const results = await MedicalProcedure.findAll({
      attributes: [
        [Sequelize.literal('"clientId"'), 'cliente'],
        [Sequelize.fn('SUM', Sequelize.col('"procedureValue"')), 'valor']
      ],
      group: ['cliente'],
      order: [
        [Sequelize.literal('"cliente"'), 'ASC']
      ],
      raw: true,
    });
  
    const query = results
      .filter((r) => r['cliente'] !== null)
      .map((res) => ({
        cliente: res['cliente'],
        valor: Number(res['valor'])
      }));
  
    return query;    
  }  

}

export default Dashboard;
