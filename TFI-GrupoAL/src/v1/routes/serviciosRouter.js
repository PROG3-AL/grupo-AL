import { Router } from 'express';
import ServiciosControlador from '../../controllers/serviciosControlador.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";
import { validarServicio } from '../../middlewares/validarServices.js';

const serviciosControlador = new ServiciosControlador();
const router = Router();

router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), serviciosControlador.listarServicios);

router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.listarServicioPorId);

router.delete('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.desactivarServicio);

router.patch('/:id/activar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.activarServicio);

router.put('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), validarServicio, serviciosControlador.actualizarServicio);

router.post('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), validarServicio, serviciosControlador.crearServicio);

export { router };