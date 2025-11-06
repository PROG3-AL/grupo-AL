import { Router } from 'express';
import ReservasControlador from '../../controllers/reservasControlador.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";
import { validarCampos } from '../../middlewares/validarCampos.js';
import { validacionesReservas } from '../../middlewares/validarReservas.js'

const reservasControlador = new ReservasControlador();
const router = Router();

router.get('/informe', autenticar, autorizar(ROLES.ADMINISTRADOR), reservasControlador.crearInforme); 

router.get('/',autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), reservasControlador.listarReservas);

router.get('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), reservasControlador.listarReservaPorId);

router.post('/', autenticar, autorizar(ROLES.ADMINISTRADOR,ROLES.CLIENTE),[
    validacionesReservas.fecha_reserva,
    validacionesReservas.salon_id,
    validacionesReservas.usuario_id,
    validacionesReservas.turno_id,
    validarCampos
], reservasControlador.crearReserva);

router.delete('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR), reservasControlador.desactivarReserva);  

router.put('/:id',autenticar, autorizar(ROLES.ADMINISTRADOR), reservasControlador.actualizarReserva);

export { router };