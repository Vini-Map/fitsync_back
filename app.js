// app.js
const express = require('express');
const connection = require('./src/config/bDados'); // Configuração do MySQL
require('dotenv').config();

// Importar rotas
const userRoutes = require('./src/routes/userRoute');

const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Usar as rotas
app.use('/api/users', userRoutes);

module.exports = app; // Exporta a instância do app
