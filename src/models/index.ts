import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import Action from "./action";
import User from "./user";
import MedicalProcedure from "./medical-procedure";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
let count = 0;
const sequelize = new Sequelize("database", "user", "password", {
  dialect: "postgres",
  benchmark: true,
  dialectOptions: {
    bigNumberStrings: true,
    useUTC: false,
  },
  timezone: "-03:00",
  pool: {
    max: 15,
    min: 0,
    acquire: 70000,
    idle: 40000,
  },
  hooks: {
    beforeConnect: async (config: any) => {
      console.info(
        "Conectando com o banco de dados usando dados do .env local"
      );
      config.host = process.env.DB_HOST;
      config.password = process.env.DB_PASS;
      config.database = process.env.DB_NAME;
      config.username = process.env.DB_USER;
      config.port = process.env.DB_PORT;
    },
  },
});

sequelize.addModels([User, Action, MedicalProcedure]);

export { User, Action, MedicalProcedure };

export default sequelize;
