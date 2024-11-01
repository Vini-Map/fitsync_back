const app = require('./app'); // Importa o app configurado no app.js
const connection = require('./src/config/bDados'); // Certifique-se de que o caminho está correto

const PORT = process.env.PORT || 5000;

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
