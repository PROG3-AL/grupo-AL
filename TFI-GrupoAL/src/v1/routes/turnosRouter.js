import { Router } from 'express';
import TurnosControlador from '../../controllers/turnosControlador.js';
import { autenticar } from '../../middlewares/autenticacion.js';
import { autorizar, ROLES } from '../../middlewares/autorizar.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { validacionesTurno } from '../../middlewares/validarTurnos.js';
import apicache from 'apicache';

const turnosControlador = new TurnosControlador();
const router = Router();
const cache = apicache.middleware;

router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), cache('5 minutes'), turnosControlador.listarTurnos);
router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), turnosControlador.buscarPorId);

router.post(
  '/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO),
  [
    validacionesTurno.orden,
    validacionesTurno.hora_desde,
    validacionesTurno.hora_hasta,
    validarCampos,
  ],
  turnosControlador.crearTurno
);

router.put(
  '/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO),
  [
    validacionesTurno.orden,
    validacionesTurno.hora_desde,
    validacionesTurno.hora_hasta,
    validarCampos,
  ],
  turnosControlador.actualizarTurno
);

router.delete('/:id/desactivar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), turnosControlador.desactivarTurno);

export { router };