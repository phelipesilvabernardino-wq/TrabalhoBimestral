const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados PostgreSQL conectado e sincronizado com sucesso.');
  app.listen(PORT, () => {
    console.log(`Servidor MVC rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});
