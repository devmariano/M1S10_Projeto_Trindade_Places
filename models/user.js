const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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
        len: [4, 15]
      }
    }
  },{
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compare(password, this.password);
      }
    }
  });

//cria tabela users caso não exista 
User.sync({ alter:true })
  .then(() => console.log('Tabela users criada com sucesso'))
  .catch(err => console.error('Erro ao criar tabela de users:', err));

console.log("passou por aqui @@@@@@@@@ USER")
module.exports = User;