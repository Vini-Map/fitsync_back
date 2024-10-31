
require('dotenv').config();
const mysql = require('mysql2');

// Configurações do banco de dados usando variáveis de ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,         // Host do banco de dados
    user: process.env.DB_USER,         // Usuário do banco de dados
    password: process.env.DB_PASSWORD, // Senha do banco de dados
    database: process.env.DB_NAME,     // Nome do banco de dados
    port: process.env.DB_PORT || 3306, // Porta do banco de dados (padrão 3306)
    ssl: {
        rejectUnauthorized: false      // Ignorar erros de SSL para Azure
    }
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como id ' + connection.threadId);
});

module.exports = connection; // Exporta a conexão
