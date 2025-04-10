import {
  Table,
  Column,
  Model,
  DataType
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

  @Column({
    type: DataType.FLOAT,
  })
  procedureValue!: number;

  @Column
  paymentStatus!: string;
}

export default MedicalProcedure;
