import { verificarToken } from '../utils/JWT.js';

export const autenticar = (req, res, next) => {
  const header = req.headers['authorization']; // Comprueba si el token está en el header de la petición
  if (!header) {
    return res.status(401).json({
      mensaje: 'Token requerido',
    });
  }

  const token = header.split(' ')[1]; // Cortamos el primer espacio que hay en el header

  try {
    const payload = verificarToken(token);
    if (!payload) {
      return res.status(403).json({
        mensaje: 'Token inválido o expirado',
      });
    }

    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(403).json({
      mensaje: 'Token inválido o corrupto',
    });
  }
};
