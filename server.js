// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoute');
const connection = require('./src/config/bDados'); // Certifique-se de que o caminho está correto

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Usar as rotas
app.use('/api', userRoutes);

// A conexão com o banco de dados deve ser verificada antes de iniciar o servidor
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como id ' + connection.threadId);
    // Inicie o servidor somente após a conexão ser bem-sucedida
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
