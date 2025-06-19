const User = require('../models/user.model');

// Listar todos los usuarios
exports.getAll = async (req, res) => {
  const usuarios = await User.findAll();
  res.json(usuarios);
};

// Obtener un usuario por ID
exports.getById = async (req, res) => {
  const usuario = await User.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json(usuario);
};

// Actualizar un usuario
exports.update = async (req, res) => {
  const { nombre, email, rol } = req.body;
  const usuario = await User.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ msg: 'No encontrado' });

  usuario.nombre = nombre || usuario.nombre;
  usuario.email = email || usuario.email;
  usuario.rol = rol || usuario.rol;
  await usuario.save();
  res.json(usuario);
};

// Eliminar un usuario
exports.delete = async (req, res) => {
  const usuario = await User.findByPk(req.params.id);
  if (!usuario) return res.status(404).json({ msg: 'No encontrado' });
  await usuario.destroy();
  res.json({ msg: 'Usuario eliminado' });
};
