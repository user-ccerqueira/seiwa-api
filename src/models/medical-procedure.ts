import {
  Table,
  Column,
  Model,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: false,
})
class MedicalProcedure extends Model {
  @Column
  clientId!: number;

  @Column
  patientId!: number;  

  @Column
  procedureDate!: Date;    

  @Column
  procedureValue!: number;

  @Column
  paymentStatus!: string;
}

export default MedicalProcedure;
