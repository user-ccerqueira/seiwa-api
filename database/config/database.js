require("dotenv").config();

module.exports = {
  development: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: { 
      bigNumberStrings: true,
      "useUTC": false,
    },
  
    timezone: '-03:00'
  }
};
