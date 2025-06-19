const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, userController.getAll);
router.get('/:id', verifyToken, userController.getById);
router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, userController.delete);
router.get('/', async (req, res) => {
try {
  const users = await User.findAll();
  res.json(users);
} catch (error) {
  console.error('Error al obtener usuarios:', error);
  res.status(500).json({ error: error.message });
}
});

module.exports = router;
