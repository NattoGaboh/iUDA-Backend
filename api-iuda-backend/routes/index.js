const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
// otras rutas

router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);

module.exports = router;
