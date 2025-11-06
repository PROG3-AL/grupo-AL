import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";
import { validarCampos } from '../../middlewares/validarCampos.js';
import { validacionesSalon } from '../../middlewares/validarSalones.js';

const salonesControlador = new SalonesControlador();
const router = Router();

router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE) ,salonesControlador.listarSalones);

router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.listarSalonPorId);

router.post('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), [
  validacionesSalon.titulo,
  validacionesSalon.direccion,
  validacionesSalon.capacidad,
  validacionesSalon.importe,
  validarCampos
], salonesControlador.crearSalon);

router.delete('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.desactivarSalon);  

router.put('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.actualizarSalon);

export { router };