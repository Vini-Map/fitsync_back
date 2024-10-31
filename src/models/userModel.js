const { DataTypes } = require('sequelize');
const sequelize = require('../config/bDados');

// Definindo o modelo de usuário
const User = sequelize.define('User', {
  // Campo "name" (nome do usuário)
  name: {
    type: DataTypes.STRING, // Tipo de dado: String
    allowNull: false,        // Não pode ser nulo
    validate: {
      notEmpty: true         // Validação: não pode ser uma string vazia
    }
  },
  // Campo "email" (e-mail do usuário)
  email: {
    type: DataTypes.STRING,  // Tipo de dado: String
    allowNull: false,        // Não pode ser nulo
    unique: true,            // O e-mail deve ser único (não pode repetir no banco)
    validate: {
      isEmail: true          // Validação: precisa ter o formato de e-mail
    }
  },
  // Campo "password" (senha do usuário)
  password: {
    type: DataTypes.STRING,  // Tipo de dado: String (senha criptografada)
    allowNull: false,        // Não pode ser nulo
    validate: {
      len: [6, 100]          // Validação: a senha deve ter entre 6 e 100 caracteres
    }
  }
}, {
  // Opções extras, como timestamps para createdAt e updatedAt
  timestamps: true
});

module.exports = User;
