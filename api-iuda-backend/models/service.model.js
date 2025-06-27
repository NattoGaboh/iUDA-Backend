const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Servicio = sequelize.define('services_offered', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  provider_id: { type: DataTypes.UUID, allowNull: false },
  categoria_id: { type: DataTypes.UUID, allowNull: false },
  descripcion: DataTypes.TEXT,
  precio_base: DataTypes.DECIMAL(10,2),
  tipo_tarifa: DataTypes.STRING,
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'services_offered',
  timestamps: false
});

module.exports = Servicio;
