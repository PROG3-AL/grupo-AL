import { Router } from "express";
import UsuariosControlador from "../../controllers/usuariosControlador.js";
import { autenticar } from "../../middlewares/autenticacion.js";
import { validacionesUsuario } from "../../middlewares/validarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";


const usuariosControlador = new UsuariosControlador()
const router = Router();

//Listar usuarios
router.get('/', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), usuariosControlador.listarUsuarios);

router.get('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR, ROLES.EMPLEADO), usuariosControlador.listarUsuarioPorId);

router.post('/', [
    validacionesUsuario.nombre, 
    validacionesUsuario.apellido, 
    validacionesUsuario.nombre_usuario, 
    validacionesUsuario.contrasenia, 
    validacionesUsuario.tipo_usuario, 
    validarCampos
] ,usuariosControlador.crearUsuario);

router.post('/login', usuariosControlador.login);

router.delete('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR), usuariosControlador.desactivarUsuario);

router.patch('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR), usuariosControlador.activarUsuario);

router.put('/:id', autenticar, autorizar(ROLES.ADMINISTRADOR), usuariosControlador.actualizarUsuario);


export { router }