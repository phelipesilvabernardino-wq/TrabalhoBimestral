const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

// Importando Rotas
const contasFixasRoutes = require('./routes/contasFixas');
const contasMesRoutes = require('./routes/contasMes');
const parcelamentosRoutes = require('./routes/parcelamentos');
const investimentosRoutes = require('./routes/investimentos');

// Usando Rotas
app.use('/api/contas-fixas', contasFixasRoutes);
app.use('/api/contas-mes', contasMesRoutes);
app.use('/api/parcelamentos', parcelamentosRoutes);
app.use('/api/investimentos', investimentosRoutes);

// Sincronizando Banco de Dados e Iniciando Servidor
const PORT = process.env.PORT || 3001;

sequelize.authenticate().then(() => {
  console.log('Banco de dados conectado e sincronizado.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});
