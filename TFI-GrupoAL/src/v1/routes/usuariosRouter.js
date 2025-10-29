import { Router } from "express";
import UsuariosControlador from "../../controllers/usuariosControlador.js";

const usuariosControlador = new UsuariosControlador()
const router = Router();

//Listar usuarios
router.get('/', usuariosControlador.listarUsuarios);
router.get('/:id', usuariosControlador.listarUsuarioPorId);
router.post('/',  usuariosControlador.crearUsuario);
router.delete('/', usuariosControlador.desactivarUsuario)
router.patch('/', usuariosControlador.activarUsuario)
router.put('/', usuariosControlador.actualizarSalon)

export default router;