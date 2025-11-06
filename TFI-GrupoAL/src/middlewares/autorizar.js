export const ROLES = {
  ADMINISTRADOR: 1,
  EMPLEADO: 2,
  CLIENTE: 3
};

export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) { 
      return res.status(401).json({ 
        mensaje: 'Token no válido o usuario no autenticado' 
        });
    }

    if (!rolesPermitidos.includes(req.usuario.tipo_usuario)) { 
      return res.status(403).json({ 
        mensaje: 'No tenés permiso para realizar esta acción' 
        });
    }

    next();
  };
};