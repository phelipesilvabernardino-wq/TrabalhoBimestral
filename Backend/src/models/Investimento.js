const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Investimento = sequelize.define('Investimento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.STRING, allowNull: false },
  instituicao: { type: DataTypes.STRING, allowNull: false },
  valorAplicado: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  valorAtual: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  tableName: 'investimentos',
  timestamps: true
});

module.exports = Investimento;
