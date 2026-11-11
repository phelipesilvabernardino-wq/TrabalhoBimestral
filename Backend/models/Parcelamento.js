const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parcelamento = sequelize.define('Parcelamento', {
  icone: { type: DataTypes.STRING, defaultValue: '💳' },
  loja: { type: DataTypes.STRING, allowNull: false },
  produto: { type: DataTypes.STRING, allowNull: false },
  valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  totalParcelas: { type: DataTypes.INTEGER, allowNull: false },
  parcelasPagas: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING, defaultValue: 'Em dia' }
});

module.exports = Parcelamento;
