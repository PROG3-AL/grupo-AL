import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';
import { validarCampos, validacionesSalon } from '../../middlewares/validarCampos.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";

const salonesControlador = new SalonesControlador();
const router = Router();

//Listar salones
router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE) ,salonesControlador.listarSalones);

//Buscar salon por id
router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.listarSalonPorId);

//Crear salon
router.post('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), [
  validacionesSalon.titulo,
  validacionesSalon.direccion,
  validacionesSalon.capacidad,
  validacionesSalon.importe,
  validarCampos
], salonesControlador.crearSalon);

//Eliminar salon cambiando a inactivo
router.delete('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.desactivarSalon);  

//Activar salon
router.patch('/:id/activar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.activarSalon); 

//Actualizar salon
router.put('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), salonesControlador.actualizarSalon);

export { router };