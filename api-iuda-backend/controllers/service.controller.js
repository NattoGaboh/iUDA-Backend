const Servicio = require('../models/service.model');

// Crear un servicio
exports.create = async (req, res) => {
  const nuevo = await Servicio.create({ ...req.body, prestador_id: req.user.id });
  res.status(201).json(nuevo);
};

// Listar todos
exports.getAll = async (req, res) => {
  const servicios = await Servicio.findAll();
  res.json(servicios);
};

// Obtener por ID
exports.getById = async (req, res) => {
  const servicio = await Servicio.findByPk(req.params.id);
  if (!servicio) return res.status(404).json({ msg: 'Servicio no encontrado' });
  res.json(servicio);
};

// Actualizar
exports.update = async (req, res) => {
  const servicio = await Servicio.findByPk(req.params.id);
  if (!servicio || servicio.prestador_id !== req.user.id) {
    return res.status(403).json({ msg: 'No autorizado' });
  }
  await servicio.update(req.body);
  res.json(servicio);
};

// Eliminar
exports.delete = async (req, res) => {
  const servicio = await Servicio.findByPk(req.params.id);
  if (!servicio || servicio.prestador_id !== req.user.id) {
    return res.status(403).json({ msg: 'No autorizado' });
  }
  await servicio.destroy();
  res.json({ msg: 'Servicio eliminado' });
};
