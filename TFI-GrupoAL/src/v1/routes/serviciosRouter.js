import { Router } from 'express';
import ServiciosControlador from '../../controllers/ServiciosControlador.js';
import { validarServicio } from '../../middlewares/validarServices.js';

const serviciosControlador = new ServiciosControlador();
const router = Router();

//Listar servicios
router.get('/', serviciosControlador.listarServicios);

//Buscar servicios por ID
router.get('/:id', serviciosControlador.listarServicioPorId);

//Eliminar o desactivar servicios
router.delete('/:id', serviciosControlador.desactivarServicio);

//Activar servicios
router.patch('/:id/activar', serviciosControlador.activarServicio);

//Actualizar servicios
router.put('/:id', validarServicio, serviciosControlador.actualizarServicio);

//Crear servicios
router.post('/', validarServicio, serviciosControlador.crearServicio);

export { router };