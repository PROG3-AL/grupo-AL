// Creo referencias para tipo_usuario
export const ROLES = {
  ADMINISTRADOR: 1,
  EMPLEADO: 2,
  CLIENTE: 3
};

//-- Funcion para autorizar rutas dependiendo tipo_usuario que hace la peticion --//
export const autorizar = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) { //Valida que usuario exista
      return res.status(401).json({ 
        mensaje: 'Token no válido o usuario no autenticado' 
        });
    }

    if (!rolesPermitidos.includes(req.usuario.tipo_usuario)) { //Verifica que el usuario sea de un rol permitido para la request
      return res.status(403).json({ 
        mensaje: 'No tenés permiso para realizar esta acción' 
        });
    }

    next();
  };
};
