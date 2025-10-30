import { verificarToken } from '../utils/JWT.js';

export const autenticar = (req, res, next) => {
  
    const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ mensaje: 'Token requerido' });

  const token = header.split(' ')[1];
  const payload = verificarToken(token);
  if (!payload) return res.status(403).json({ mensaje: 'Token inválido o expirado' });

  req.usuario = payload;
  next();

};