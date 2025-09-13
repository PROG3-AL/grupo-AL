import { Router } from 'express';
import { listarSalones, listarSalonPorId, listarSalonPorIdBody } from '../controllers/salones.js';

const router = Router();

//Listar salones
router.get('/', listarSalones);

//Buscar salon por id
router.get('/:id', listarSalonPorId); //para buscar en el navegador
router.post('/api/by-id', listarSalonPorIdBody); //para ingresarlo en el body de Brunito ;)

export default router;