import { Router } from 'express';
import TurnosControlador from '../../controllers/turnosControlador.js';
import { validarCampos, validacionesTurno } from '../../middlewares/validarCampos.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";

const turnosControlador = new TurnosControlador();
const router = Router();

// Rutas BREAD: Browse, Read, Edit, Add, Delete
router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), turnosControlador.listarTurnos);
router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), turnosControlador.buscarPorId);

router.post(
  '/',autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO),
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

router.patch('/:id/desactivar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), turnosControlador.desactivarTurno);
router.patch('/:id/activar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), turnosControlador.activarTurno);

export { router };