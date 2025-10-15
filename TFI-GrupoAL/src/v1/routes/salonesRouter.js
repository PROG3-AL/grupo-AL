import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';
import { validarCampos, validacionesSalon } from '../../middlewares/validarCampos.js';

const salonesControlador = new SalonesControlador();
const router = Router();

//Listar salones
router.get('/', salonesControlador.listarSalones);

//Buscar salon por id
router.get('/:id', salonesControlador.listarSalonPorId);

//Crear salon
router.post('/', [
  validacionesSalon.titulo,
  validacionesSalon.direccion,
  validacionesSalon.capacidad,
  validacionesSalon.importe,
  validarCampos
], salonesControlador.crearSalon);

//Eliminar salon cambiando a inactivo
router.delete('/:id', salonesControlador.desactivarSalon);  

//Activar salon
router.patch('/:id/activar', salonesControlador.activarSalon); 

//Actualizar salon
router.put('/:id', salonesControlador.actualizarSalon);

export { router };