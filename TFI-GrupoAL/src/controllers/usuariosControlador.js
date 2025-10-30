import UsuariosServicio from "../services/usuariosServicios.js"

export default class UsuariosControlador {

    constructor () {
        this.usuariosServicio = new UsuariosServicio();
    };

    // -- Funcion para listar todos los usuarios -- //
    listarUsuarios = async (req, res, next) => {

        try{
            const usuarios = await this.usuariosServicio.buscarUsuarios();
            res.json({
                estado: true,
                datos: usuarios
            });
        } catch (err) {
            console.log('Error en GET /usuarios', err);
            res.status (500).json({
                estado: false,
                mensaje: "Error interno del servidor"
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

        try{
            const{id} = req.params;
            const usuario = await this.usuariosServicio.buscarPorId(id);
            
            res.json({
                estado:true,
                datos: usuario
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
        };

        try {
            const {id} = req.params;
            const salonExiste = await this.usuariosServicio.buscarPorId(id);

            if (!salonExiste) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Usuario no encontrado o ya esta desactivado"
                });
            }

            await this.usuariosServicio.desactivarUsuario(id);

            res.status(200).json({
                estado: true,
                mensaje: "usuario desactivado correctamente"
            });

        } catch (err) {

            console.log("Error al 'eliminar' el usuario", err);

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
        };

        try {
            const {id} = req.params;
            const salonExiste = await this.usuariosServicio.buscarPorId(id);

            if (!salonExiste) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Usuario no encontrado o ya esta activado"
                });
            }

            await this.usuariosServicio.activarUsuario(id);

            res.status(200).json({
                estado: true,
                mensaje: "usuario activado correctamente"
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
            return res.status(400).send ({
                estado: false,
                mensaje: "Faltan datos requeridos para crear el usuario (npmbre, apellido, Emal, contraseñia)"
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
        
    };

    // -- Funcion para hacer login con JWS -- //
    login = async (req, res, next) => {
        const { nombre_usuario, contrasenia } = req.body;

        if (!nombre_usuario || !contrasenia) {
            return res.status(400).json({ estado: false, mensaje: 'Faltan credenciales' });
        }

        try {
            const result = await this.usuariosServicio.login(nombre_usuario, contrasenia);
            if (!result) {
                return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas' });
            }

            res.json({
                estado: true,
                mensaje: 'Login exitoso',
                token: result.token,
                usuario: result.usuario
            });
        } catch (err) {
            next(err);
        }
    };

};


