import UsuariosServicio from "../services/usuariosServicio.js";
import { ROLES } from "../middlewares/autorizar.js";

export default class UsuariosControlador {

    constructor() {
        this.usuariosServicio = new UsuariosServicio();
    };

    // -- Funcion para listar todos los usuarios -- //
    listarUsuarios = async (req, res, next) => {

        try {

            let usuarios = await this.usuariosServicio.buscarUsuarios();

            if (req.usuario.tipo_usuario === ROLES.EMPLEADO) {
                usuarios = usuarios.filter(u => u.tipo_usuario === 3);
            }

            res.json({
                estado: true,
                usuarios: usuarios
            });

        } catch (err) {
            console.log('Error en GET /usuarios', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error al listar usuarios"
            });

            next()
        };
    };

    // -- Funcion para mostrar un usuario por su id -- //
    listarUsuarioPorId = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID del usuario"
            });
        }

        try {
            const { id } = req.params;
            const usuario = await this.usuariosServicio.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Usuario no encontrado"
                });
            }

            const rolSolicitante = req.usuario.tipo_usuario;

            if (rolSolicitante === ROLES.EMPLEADO && usuario.tipo_usuario !== 3) {
                return res.status(403).json({
                    estado: false,
                    mensaje: "Solo se pueden consultar usuarios de tipo cliente"
                });
            }

            res.json({
                estado: true,
                usuarios: usuario
            });

        } catch (err) {
            console.log("Error en GET /usuarios/usuario_id", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    }

    // -- Funcion para desactivar un usuario -- //
    desactivarUsuario = async (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID del usuario"
            });
        }

        try {
            const { id } = req.params;
            const usuario = await this.usuariosServicio.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "Usuario no encontrado"
                });
            }

            if (usuario.activo === 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El usuario ya está inactivo"
                });
            }

            const resultado = await this.usuariosServicio.desactivarUsuario(id);

            if (!resultado || resultado.affectedRows === 0) {
                return res.status(500).json({
                    estado: false,
                    mensaje: "No se pudo desactivar el usuario. Intente nuevamente."
                });
            }

            return res.status(200).json({
                estado: true,
                mensaje: "Usuario desactivado correctamente"
            });

        } catch (err) {
            console.log("Error al desactivar el usuario", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    // -- Funcion para activar un usuario -- //
    activarUsuario = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID del usuario"
            });
        }

        try {
            const { id } = req.params;
            const usuario = await this.usuariosServicio.buscarPorId(id);

            if (!usuario) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Usuario no encontrado"
                });
            }

            if (usuario.activo === 1) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El usuario ya está activo"
                });
            }

            const resultado = await this.usuariosServicio.activarUsuario(id);
            if (!resultado || resultado.affectedRows === 0) {
                return res.status(500).json({
                    estado: false,
                    mensaje: "No se pudo activar el usuario. Intente nuevamente."
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: "Usuario activado correctamente"
            });

        } catch (err) {
            console.log("Error al activar al usuario", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };


    // -- Funcion para crear un usuario -- //   
    crearUsuario = async (req, res, next) => {

        if (!req.body || !req.body.nombre || !req.body.apellido || !req.body.nombre_usuario || !req.body.contrasenia) {
            return res.status(400).send({
                estado: false,
                mensaje: "Faltan datos requeridos para crear el usuario (nombre, apellido, Emal, contraseñia)"
            });
        }

        try {
            const nuevoUsuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nombre_usuario: req.body.nombre_usuario,
                contrasenia: req.body.contrasenia,
                tipo_usuario: req.body.tipo_usuario,
                activo: req.body.activo ?? 1 // si no mandás activo, por defecto es 1
            };

            const usuarioCreado = await this.usuariosServicio.crearUsuario(nuevoUsuario);

            res.status(201).send({
                estado: true,
                mensaje: "Usuario creado correctamente",
                data: usuarioCreado
            });

        } catch (err) {
            console.log('Error en POST /usuarios/', err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    // -- Funcion para actualizar un usuario -- //
    actualizarUsuario = async (req, res, next) => {
        try {
            const { id } = req.params;
            const datos = req.body;

            // Llamamos al servicio
            const usuarioActualizado = await this.usuariosServicio.actualizarUsuario(id, datos);

            // Si no existe el usuario
            if (!usuarioActualizado) {
                return res.status(404).json({ mensaje: "Usuario no encontrado o sin cambios." });
            }

            return res.status(200).json({
                mensaje: "Usuario actualizado correctamente.",
                usuario: usuarioActualizado
            });
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
            next(error);
        }
    };

    // -- Funcion para hacer login con JWS -- //
    login = async (req, res, next) => {
        const { nombre_usuario, contrasenia } = req.body;

        if (!nombre_usuario || !contrasenia) {
            return res.status(400).json({
                estado: false,
                mensaje: "Debe ingresar nombre de usuario y contraseña"
            });
        }

        try {
            const resultado = await this.usuariosServicio.login(nombre_usuario, contrasenia);

            if (!resultado) {
                return res.status(401).json({
                    estado: false,
                    mensaje: "Usuario o contraseña incorrectos"
                });
            }

            const { usuario, token } = resultado;

            return res.status(200).json({
                estado: true,
                mensaje: "Inicio de sesión exitoso",
                usuarios: {
                    usuario_id: usuario.usuario_id,
                    nombre_usuario: usuario.nombre_usuario,
                    tipo_usuario: usuario.tipo_usuario,
                    token
                }
            });
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json({
                estado: false,
                mensaje: "Error interno al iniciar sesión"
            });
        }
    };
};


