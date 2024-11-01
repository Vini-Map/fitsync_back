// server.js
const app = require('./app'); // Importa o app configurado no app.js
const connection = require('./src/config/bDados'); // Conexão com o banco de dados

const PORT = process.env.PORT || 5000;

// A conexão com o banco de dados já é realizada na configuração do mysql2
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
