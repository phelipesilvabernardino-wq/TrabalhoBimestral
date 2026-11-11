const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaFixa = sequelize.define('ContaFixa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  diaVencimento: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Ativo' },
  icone: { type: DataTypes.STRING, defaultValue: '🏠' }
}, {
  tableName: 'contas_fixas',
  timestamps: true
});

module.exports = ContaFixa;
