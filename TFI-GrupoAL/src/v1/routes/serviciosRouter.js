import { Router } from 'express';
import ServiciosControlador from '../../controllers/ServiciosControlador.js';
import { validarServicio } from '../../middlewares/validarServices.js';
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";

const serviciosControlador = new ServiciosControlador();
const router = Router();

//Listar servicios
router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO, ROLES.CLIENTE), serviciosControlador.listarServicios);

//Buscar servicios por ID
router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.listarServicioPorId);

//Eliminar o desactivar servicios
router.delete('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.desactivarServicio);

//Activar servicios
router.patch('/:id/activar', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), serviciosControlador.activarServicio);

//Actualizar servicios
router.put('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), validarServicio, serviciosControlador.actualizarServicio);

//Crear servicios
router.post('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), validarServicio, serviciosControlador.crearServicio);

export { router };