require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const routes = require('./routes');
const cors = require('cors')

// Permite el acceso desde el frontend
app.use(cors({
  origin: "http://localhost:5173", // Cambia esto si tu frontend está en otro puerto
  credentials: true
}));

app.use(express.json());
app.use('/api/servicios', serviceRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a PostgreSQL');
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  })
  .catch(err => console.error('Error al conectar a DB', err));

  
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});
