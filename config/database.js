const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.NAME_DATABASE, process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
  host: process.env.HOST_DATABASE,
  dialect: process.env.DIALECT_DATABASE,
  operatorsAliases: 0
});
