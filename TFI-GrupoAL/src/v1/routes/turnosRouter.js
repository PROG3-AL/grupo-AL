import { Router } from 'express';
import TurnosControlador from '../../controllers/turnosControlador.js';
import { validarCampos, validacionesTurno } from '../../middlewares/validarCampos.js';

const turnosControlador = new TurnosControlador();
const router = Router();

// Rutas BREAD: Browse, Read, Edit, Add, Delete
router.get('/', turnosControlador.listarTurnos);
router.get('/:id', turnosControlador.buscarPorId);

router.post(
  '/',
  [
    validacionesTurno.orden,
    validacionesTurno.hora_desde,
    validacionesTurno.hora_hasta,
    validarCampos,
  ],
  turnosControlador.crearTurno
);

router.put(
  '/:id',
  [
    validacionesTurno.orden,
    validacionesTurno.hora_desde,
    validacionesTurno.hora_hasta,
    validarCampos,
  ],
  turnosControlador.actualizarTurno
);

router.patch('/:id/desactivar', turnosControlador.desactivarTurno);
router.patch('/:id/activar', turnosControlador.activarTurno);

export { router };