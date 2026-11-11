const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaMes = sequelize.define('ContaMes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  pago: { type: DataTypes.BOOLEAN, defaultValue: false },
  icone: { type: DataTypes.STRING, defaultValue: '🛒' }
}, {
  tableName: 'contas_mes',
  timestamps: true
});

module.exports = ContaMes;
