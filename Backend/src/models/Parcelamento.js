const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parcelamento = sequelize.define('Parcelamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  loja: { type: DataTypes.STRING, allowNull: false },
  produto: { type: DataTypes.STRING, allowNull: false },
  valorTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  totalParcelas: { type: DataTypes.INTEGER, allowNull: false },
  parcelasPagas: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Em dia' },
  icone: { type: DataTypes.STRING, defaultValue: '💳' }
}, {
  tableName: 'parcelamentos',
  timestamps: true
});

module.exports = Parcelamento;
