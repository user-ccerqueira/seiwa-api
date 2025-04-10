import { MedicalProcedure } from '../models';
import { Op } from 'sequelize';
export class MedicalProceduresRepository {
  getAll() {
    return MedicalProcedure.findAll({
      order: ['clientId']
    });
  }
  getAllParanoid() {
    return MedicalProcedure.findAll({
      order: ['clientId'],
      paranoid: false
    });
  }

  deleteById(id: number, transaction) {
    return MedicalProcedure.destroy({
      where: { id: id },
      transaction
    });
  }

  restoreById(id: number, transaction) {
    return MedicalProcedure.restore({
      where: { id: id },
      transaction
    });
  }

  createProduct(data, transaction) {
    return MedicalProcedure.create(data, { transaction });
  }

  updateProduct(id: number, data, transaction) {
    return MedicalProcedure.update(data, {
      transaction,
      where: {
        id: id
      }
    });
  }
}

export default MedicalProceduresRepository;
