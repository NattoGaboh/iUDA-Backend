const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const UserController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, UserController.getAll);
router.get('/:id', verifyToken, UserController.getById);
router.put('/:id', verifyToken, UserController.update);
router.delete('/:id', verifyToken, UserController.delete);

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
