const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ msg: 'Token requerido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id, rol }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ msg: 'Acceso no autorizado' });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRole };

