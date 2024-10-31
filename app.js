const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config();

// Importar rotas
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Sincronizar os modelos com o banco de dados MySQL
sequelize.sync()
  .then(() => console.log('Modelos sincronizados com o banco de dados MySQL'))
  .catch((err) => console.log('Erro ao sincronizar com o MySQL:', err));

// Usar as rotas
app.use('/api/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
