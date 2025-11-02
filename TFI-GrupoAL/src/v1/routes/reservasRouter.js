import { Router } from 'express';
import ReservasControlador from '../../controllers/reservasControlador.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";
// import { validarCampos, validacionesSalon } from '../../middlewares/validarCampos.js';

const reservasControlador = new ReservasControlador();
const router = Router();

//Listar reservas
router.get('/',autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), reservasControlador.listarReservas);

//Buscar reserva por id
router.get('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), reservasControlador.listarReservaPorId);

//Crear reserva
router.post('/',autenticar, autorizar(ROLES.ADMINISTRADOR,ROLES.CLIENTE), reservasControlador.crearReserva);

//Eliminar reserva
router.delete('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR), reservasControlador.desactivarReserva);  

//Actualizar reserva
router.put('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR), reservasControlador.actualizarReserva);

export { router };