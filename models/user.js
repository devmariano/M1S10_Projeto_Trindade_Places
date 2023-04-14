const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 100]
      }
    }
  });

//cria tabela cadastros caso não exista 
User.sync({ alter:true })
  .then(() => console.log('Tabela users criada com sucesso'))
  .catch(err => console.error('Erro ao criar tabela de users:', err));

  module.exports = User;