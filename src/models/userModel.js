const connection = require('../config/bDados'); // Importa a conexão com o banco de dados

const User = {
  // Método para criar um novo usuário
  create: (userData, callback) => {
    const { email, password } = userData; // Desestrutura os dados do usuário
    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)'; // Prepare a query

    connection.query(query, [email, password], (error, results) => {
      if (error) {
        return callback(error); // Retorna o erro se houver
      }
      callback(null, results.insertId); // Retorna o ID do novo usuário
    });
  },

  // Adicione outros métodos como find, update, delete, se necessário
};

module.exports = User;
