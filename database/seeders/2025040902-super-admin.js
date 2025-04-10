"use strict";
const bcrypt = require("bcrypt");

function passwordHash(password) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await passwordHash("Seiwa@123");
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "user-seiwa",
          name: "Usuário Administrador",
          password,
          isTempPassword: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "Users",
      {
        id: 1,
      },
      {}
    );
  },
};
