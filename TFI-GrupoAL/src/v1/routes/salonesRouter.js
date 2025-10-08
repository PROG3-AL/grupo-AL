import { Router } from 'express';
import SalonesControlador from '../../controllers/salonesControlador.js';

const salonesControlador = new SalonesControlador();
const router = Router();

//Listar salones
router.get('/', salonesControlador.listarSalones);

//Buscar salon por id
router.get('/:id', salonesControlador.listarSalonPorId); //para buscar en el navegador

//Crear salon
router.post('/', salonesControlador.crearSalon);

//Eliminar salon cambiando a inactivo
router.delete('/:id', salonesControlador.desactivarSalon);  

//Activar salon
router.patch('/:id/activar', salonesControlador.activarSalon); 

//Actualizar salon
router.put('/:id', salonesControlador.actualizarSalon); //para ingresarlo en el body de Brunito ;)

export { router };