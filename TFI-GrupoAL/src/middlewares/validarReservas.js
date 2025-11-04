import { body } from "express-validator"

export const validacionesReservas = {
    fecha_reserva: body("fecha_reserva")
    .notEmpty().withMessage("La fecha de la reserva es obligatoria")
    .isISO8601().withMessage("Debe tener formato de fecha válido (YYYY-MM-DD)"),

    salon_id: body("salon_id")
    .notEmpty().withMessage("El ID del salón es obligatorio")
    .isInt({ min: 1 }).withMessage("El ID del salón debe ser un número entero positivo"),

    usuario_id: body("usuario_id")
    .notEmpty().withMessage("El ID del usuario es obligatorio")
    .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero positivo"),

    turno_id: body("turno_id")
    .notEmpty().withMessage("El ID del turno es obligatorio")
    .isInt({ min: 1 }).withMessage("El ID del turno debe ser un número entero positivo"),
}