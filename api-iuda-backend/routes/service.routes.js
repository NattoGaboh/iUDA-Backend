const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/service.controller');
const { verifyToken, authorizeRole } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, authorizeRole(['prestador']), servicioController.create);
router.get('/', servicioController.getAll);
router.get('/:id', servicioController.getById);
router.put('/:id', verifyToken, authorizeRole(['prestador']), servicioController.update);
router.delete('/:id', verifyToken, authorizeRole(['prestador']), servicioController.delete);

module.exports = router;
