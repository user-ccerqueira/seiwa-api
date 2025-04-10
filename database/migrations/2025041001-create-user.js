"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      passwordDate: {
        type: Sequelize.DATE,
      },        
      isTempPassword: {
        type: Sequelize.BOOLEAN,
      },      
      apiKey: {
        type: Sequelize.STRING(400),
      },  
      apiKeyDate: {
        type: Sequelize.DATE,
      },                 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};
