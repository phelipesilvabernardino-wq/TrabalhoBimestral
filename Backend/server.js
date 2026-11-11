const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const contasFixasRoutes = require('./routes/contasFixas');
const contasMesRoutes = require('./routes/contasMes');
const parcelamentosRoutes = require('./routes/parcelamentos');
const investimentosRoutes = require('./routes/investimentos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contas-fixas', contasFixasRoutes);
app.use('/api/contas-mes', contasMesRoutes);
app.use('/api/parcelamentos', parcelamentosRoutes);
app.use('/api/investimentos', investimentosRoutes);

const PORT = process.env.PORT || 3001;

sequelize.authenticate().then(() => {
  app.listen(PORT, () => {});
}).catch(err => {});
