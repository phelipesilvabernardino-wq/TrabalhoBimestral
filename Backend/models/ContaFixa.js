const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaFixa = sequelize.define('ContaFixa', {
  icone: { type: DataTypes.STRING, defaultValue: '🏠' },
  nome: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  diaVencimento: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Em dia' }
});

module.exports = ContaFixa;
