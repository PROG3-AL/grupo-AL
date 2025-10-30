import { body, validationResult } from "express-validator";

// validaciones para usuarios
export const validacionesUsuario = {
  nombre: body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 20 })
    .withMessage("El nombre debe tener entre 2 y 20 caracteres"),

  apellido: body("apellido")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 20 })
    .withMessage("El apellido debe tener entre 2 y 20 caracteres"),

  nombre_usuario: body("nombre_usuario")
    .trim()
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 4, max: 30 })
    .withMessage("Debe tener entre 4 y 30 caracteres"),

  contrasenia: body("contrasenia")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  tipo_usuario: body("tipo_usuario")
    .isInt({ min: 1, max: 3 })
    .withMessage("El tipo de usuario debe ser 1 (administrador), 2 (empleado) o 3 (cliente)")
};
