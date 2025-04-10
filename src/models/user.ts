import { Table, Column, Model, AllowNull, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import Action from "./action";

@Table({
  timestamps: true,
  paranoid: true,
})
class User extends Model {
  @Column
  login!: string;

  @Column
  name!: string;

  @Column
  password!: string;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  apiKey?: string;

  @Column
  isTempPassword!: boolean;

  @Column
  passwordDate!: Date;

  @Column
  apiKeyDate!: Date;

  @AllowNull(true)
  @Column
  deletedAt!: Date;

  @HasMany(() => Action)
  actions!: Action[];
}

export default User;
