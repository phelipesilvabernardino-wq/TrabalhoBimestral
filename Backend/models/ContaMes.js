const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaMes = sequelize.define('ContaMes', {
  icone: { type: DataTypes.STRING, defaultValue: '🛒' },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  pago: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = ContaMes;
