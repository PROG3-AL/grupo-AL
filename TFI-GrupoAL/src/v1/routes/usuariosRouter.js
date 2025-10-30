import { Router } from "express";
import UsuariosControlador from "../../controllers/usuariosControlador.js";
import { autenticar } from "../../middlewares/autenticacion.js";
import { validacionesUsuario } from "../../middlewares/validarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";


const usuariosControlador = new UsuariosControlador()
const router = Router();

//Listar usuarios
router.get('/', autenticar, usuariosControlador.listarUsuarios);

router.get('/:id', autenticar, usuariosControlador.listarUsuarioPorId);

router.post('/', [
    validacionesUsuario.nombre, 
    validacionesUsuario.apellido, 
    validacionesUsuario.nombre_usuario, 
    validacionesUsuario.contrasenia, 
    validacionesUsuario.tipo_usuario, 
    validarCampos
] ,usuariosControlador.crearUsuario);

router.post('/login', usuariosControlador.login);

router.delete('/:id', autenticar, usuariosControlador.desactivarUsuario);

router.patch('/:id', autenticar, usuariosControlador.activarUsuario);

router.put('/:id', autenticar, usuariosControlador.actualizarUsuario);


export default router;