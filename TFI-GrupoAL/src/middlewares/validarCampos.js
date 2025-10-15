import { body, validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json({
            estado: "fallo",
            mensaje: errores.mapped()
        })
    }
    next();
}

// salones
export const validacionesSalon = {
  titulo: body("titulo")  
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener entre 5 y 100 caracteres"),

  direccion: body("direccion")
  .trim()
  .notEmpty().withMessage("La dirección es obligatoria"),
  
  capacidad: body("capacidad")
    .notEmpty().withMessage("La capacidad es obligatoria")
    .isInt({ min: 1, max: 1000 })
    .withMessage("La capacidad debe ser un número entre 1 y 1000"),
  
  importe: body("importe")
    .notEmpty().withMessage("El importe es obligatorio")
    .isFloat({ min: 0, max: 999999.99 })
    .withMessage("El importe debe ser entre $150.000 y $1.5000.000")
};