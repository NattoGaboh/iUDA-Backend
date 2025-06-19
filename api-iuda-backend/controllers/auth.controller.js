const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: 'Email ya registrado.' });

    const hash = await bcrypt.hash(contraseña, 10);
    const newUser = await User.create({ nombre, email, contraseña_hash: hash, rol, verificado: false });

    res.status(201).json({ msg: 'Usuario creado', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas.' });

    const match = await bcrypt.compare(contraseña, user.contraseña_hash);
    if (!match) return res.status(400).json({ msg: 'Credenciales inválidas.' });

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
