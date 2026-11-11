const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Investimento = sequelize.define('Investimento', {
  tipo: { type: DataTypes.STRING, allowNull: false },
  instituicao: { type: DataTypes.STRING, allowNull: false },
  valorAplicado: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  valorAtual: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  dataAplicacao: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Investimento;
