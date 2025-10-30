import Usuarios from '../database/usuarios.js';
import { generarToken } from '../utils/JWT.js';
//import bcrypt from 'bcrypt';

export default class UsuariosServicios {
    constructor () {
        this.usuarios = new Usuarios()
    };

    buscarUsuarios = () => {
        return this.usuarios.buscarUsuarios();
    }

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    }

    buscarPorEmail = (nombre_usuario) => {
        return this.usuarios.buscarUsuarioPorEmail(nombre_usuario);
    }

    desactivarUsuario = (id) => {
        return this.usuarios.desactivarUsuario(id);
    }

    activarUsuario = (id) => {
        return this.usuarios.activarUsuario(id);
    }

    crearUsuario = async (usuario) => {
        // Generamos el hash antes de crear en usuario
        //const salt = 10;
        //const hash = await bcrypt.hash(usuario.contrasenia, salt);

        //const nuevoUsuario = {
        //    ...usuario,
        //    contrasenia: hash
        //};
        
        return this.usuarios.crearUsuario(usuario);
    }

    actualizarUsuario = async (id, datos) => {
        const existe = await this.usuarios.buscarPorId(id);

        if (!existe) {
            return null;
        }

        return await this.usuarios.actualizarUsuario(id, datos);
    }

    login = async (nombre_usuario, contrasenia) => {
        const usuario = await this.usuarios.buscarUsuarioPorEmail(nombre_usuario);
        if (!usuario) return null; // usuario no existe

        if (usuario.contrasenia !== contrasenia) return null; // contraseña incorrecta

        const token = generarToken(usuario);
        return { usuario, token };
    };


}