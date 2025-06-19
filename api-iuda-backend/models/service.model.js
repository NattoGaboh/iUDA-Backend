const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Servicio = sequelize.define('services_offered', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  provider_id: { type: DataTypes.UUID, allowNull: false },
  categoria_id: { type: DataTypes.UUID, allowNull: false },
  descripcion: DataTypes.TEXT,
  tarifa: DataTypes.DECIMAL(10,2),
  tipo_tarifa: DataTypes.STRING,
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  timestamps: true
});

module.exports = Servicio;
