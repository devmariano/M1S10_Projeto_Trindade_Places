const Sequelize = require('sequelize');
const db = require('../config/database');

const Cadastro = db.define('cadastros', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING, // igual varchar(255) no sql 
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING
  },
  opening_hours: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  latitude: {
      type: Sequelize.DECIMAL,
  },
  longitude: {
      type: Sequelize.DECIMAL,
  }
});
//cria tabela cadastros caso não exista 
Cadastro.sync({ alter:true })
  .then(() => console.log('Tabela de cadastros criada com sucesso'))
  .catch(err => console.error('Erro ao criar tabela de cadastros:', err));

  console.log("passou por aqui @@@@@@@@@ CADASTRO")

module.exports = Cadastro;
