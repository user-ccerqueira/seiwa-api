import {
  Table,
  Column,
  ForeignKey,
  Model,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";

@Table({
  timestamps: true,
  paranoid: false,
})
class Action extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column
  action!: string;

  @Column
  actionable!: string;

  @Column
  actionableId!: string;

  @Column
  description!: string;

  @Column
  rawData!: string;
}

export default Action;
