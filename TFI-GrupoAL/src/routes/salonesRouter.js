import { Router } from 'express';
import { listarSalones, listarSalonPorId, listarSalonPorIdBody, activarSalon, desactivarSalon, actualizarSalon, crearSalon } from '../controllers/salones.js';

const router = Router();

//Listar salones
router.get('/', listarSalones);

//Buscar salon por id
router.get('/:id', listarSalonPorId); //para buscar en el navegador
router.post('/api/by-id', listarSalonPorIdBody); //para ingresarlo en el body de Brunito ;)
router.post('/', crearSalon);
router.delete('/:id', desactivarSalon);  
router.patch('/:id/activar', activarSalon); 
router.put('/:id', actualizarSalon); //para ingresarlo en el body de Brunito ;)

export default router;