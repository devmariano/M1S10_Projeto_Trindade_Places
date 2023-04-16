const Sequelize = require('sequelize');

module.exports = new Sequelize('trindade_places', 'postgres', 'senai', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0
});
