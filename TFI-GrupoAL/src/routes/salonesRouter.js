import { Router } from 'express';
import { listarSalones, listarSalonPorId, listarSalonPorIdBody, desactivarSalon, activarSalon } from '../controllers/salones.js';

const router = Router();

//Listar salones
router.get('/', listarSalones);

//Buscar salon por id
router.get('/:id', listarSalonPorId); //para buscar en el navegador
router.post('/api/by-id', listarSalonPorIdBody); //para ingresarlo en el body de Brunito ;)
router.delete('/:id', desactivarSalon);  
router.patch('/:id/activar', activarSalon); 


export default router;