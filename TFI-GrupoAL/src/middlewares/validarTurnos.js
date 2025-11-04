import { body } from "express-validator";

export const validacionesTurno = {
  orden: body("orden")
    .notEmpty().withMessage("El orden es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El orden debe ser un número entero positivo"),

  hora_desde: body("hora_desde")
    .notEmpty().withMessage("La hora de inicio es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Formato de hora inválido (HH:mm)"),

  hora_hasta: body("hora_hasta")
    .notEmpty().withMessage("La hora de fin es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Formato de hora inválido (HH:mm)"),
};