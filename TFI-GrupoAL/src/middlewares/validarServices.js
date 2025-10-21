import { body, validationResult } from 'express-validator';

export const validarServicio = [
    body("descripcion")
        .trim()
        .notEmpty().withMessage("La descripcion es obligatoria")
        .isLength({max: 120}).withMessage("La descripcion no puede exceder los 120 caracteres"),
    body("importe")
        .trim()
        .notEmpty().withMessage("Tienes que insertar un monto mayor a 0"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array().map(e => (
                    {
                        campo: e.path,
                        mensaje: e.msg
                    }
                ))
            });
        }

        next();
    }
];