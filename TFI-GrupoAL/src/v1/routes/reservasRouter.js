import { Router } from 'express';
import ReservasControlador from '../../controllers/reservasControlador.js';
// import { validarCampos, validacionesSalon } from '../../middlewares/validarCampos.js';

const reservasControlador = new ReservasControlador();
const router = Router();

//Listar reservas
router.get('/', reservasControlador.listarReservas);

//Buscar reserva por id
router.get('/:id', reservasControlador.listarReservaPorId);

//Crear reserva
router.post('/', reservasControlador.crearReserva);

//Eliminar reserva
router.delete('/:id', reservasControlador.desactivarReserva);  

//Actualizar reserva
router.put('/:id', reservasControlador.actualizarReserva);

export { router };