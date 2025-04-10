"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MedicalProcedures", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clientId: {
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      procedureDate: {
        type: Sequelize.DATE,
      },    
      procedureValue: {
        type: Sequelize.INTEGER
      }, 
      paymentStatus: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("MedicalProcedures");
  },
};
