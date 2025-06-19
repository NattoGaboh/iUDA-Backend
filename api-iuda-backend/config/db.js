const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('iuda', 'postgres','12345', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5433',
  logging: console.log,
});

module.exports = sequelize;
