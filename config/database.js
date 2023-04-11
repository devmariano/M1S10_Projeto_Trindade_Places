const Sequelize = require('sequelize');

module.exports = new Sequelize('trindade_places', 'postgres', 'senac001', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0
});
