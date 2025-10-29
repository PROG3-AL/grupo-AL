import Usuarios from '../database/usuarios.js';

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

    crearUsuario = (usuario) => {
        return this.usuarios.crearUsuario(usuario);
    }

    actualizarUsuario = async (id, datos) => {
        const existe = await this.usuarios.buscarPorId(id);

        if (!existe) {
            return null;
        }

        return await this.usuarios.actualizarUsuario(id, datos);
    }


}