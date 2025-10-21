import ServiciosServicio from "../services/serviciosServicio.js";

export default class ServiciosControlador {

    constructor () {
        this.serviciosServicio = new ServiciosServicio();
    };

    //Funcion para mostrar todos los servicios
    listarServicios = async (req, res, next) => {

        try {

            const servicios = await this.serviciosServicio.buscarServicios();
            res.json({
                estado: true,
                datos: servicios
            });

        } catch (err) {

            console.log('Error en GET /servicios', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };

    };

    //Funcion para mostrar solo el servicio con un id especifico
    listarServicioPorId = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID del servicio"
            });
        };

        try {

            const {id} = req.params;
            const servicio = await this.serviciosServicio.buscarPorId(id);

            if (!servicio) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `El servicio con ID ${id} no existe`
                });
            };

            res.json({
                estado: true,
                datos: servicio
            });

        } catch (err) {

            console.log('Error en GET / servicios/servicio_id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };

    };

    //Se desactiva el servicio con un "soft delete"
    desactivarServicio = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el id del servicio a eliminar"
            });
        };

        try {

            const {id} = req.params;

            const servicioExistente = await this.serviciosServicio.buscarPorId(id);

            if (!servicioExistente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "El servicio con ID no fue encontrado"
                });
            };

            if (servicioExistente.activo === 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El servicio esta desactivado"
                });
            };

            await this.serviciosServicio.desactivarServicio(id);

            res.status(200).json({
                estado: true,
                mensaje: "El servicio se desactivó correctamente"
            });

        } catch (err) {

            console.log('Error al desactivar el servicio', err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    //Se activa el servicio 
    activarServicio = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el id del servicio a activar"
            });
        };

        try {

            const { id } = req.params;

            const servicioExistente = await this.serviciosServicio.buscarPorId(id);

            if (!servicioExistente) {

                return res.status(404).json({
                    estado: false,
                    mensaje: "El servicio con id no existe"
                });

            };

            if (servicioExistente.activo === 1) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El servicio con el id proporcionado ya esta activado"
                });
            };

            await this.serviciosServicio.activarServicio(id);

            res.status(200).json({
                estado: true,
                mensaje: "Servicio activado correctamente"
            });

        } catch (err) {

            console.log("Error al activar el servicio", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };

    };

    //Se actualiza el servicio
    actualizarServicio = async (req, res, next) => {

        if (!req.params.id || !req.body) {
            return res.status(400).json({
                estado: false,
                mensaje: "Faltan los datos requeridos"
            });
        };

        try {

            const {id} = req.params;

            const actualizado = await this.serviciosServicio.actualizarServicio(id, req.body);

            if (!actualizado) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "No se encontró el servicio a actualizar"
                });
            };

            res.status(200).json({
                estado: true,
                mensaje: "Servicio actualizado correctamente",
                datos: actualizado
            });

        } catch (err) {

            console.log('Error en PUT / servicios/:servicio_id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };
    };

    //Se crea el servicio
    crearServicio = async (req, res, next) => {

        if (!req.body) {
            return res.status(400).json({
                estado: false,
                mensaje: "Datos no insertados para servicios"
            });
        };

        try {

            const nuevoServicio = {
                descripcion: req.body.descripcion,
                importe: req.body.importe,
                activo: 1
            };

            //Si el servicio tiene el mismo nombre, no se crea para evitar duplicados - Opcional pero creo que importante
            const servicioExiste = await this.serviciosServicio.buscarServicioPorNombre(nuevoServicio.descripcion);

            if (servicioExiste) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El nombre del servicio ya existe"
                });
            };

            const servicioCreado = await this.serviciosServicio.crearServicio(nuevoServicio);

            res.status(200).json({
                estado: true,
                mensaje: "Servicio creado exitosamente",
                datos: servicioCreado
            });

        } catch (err) {

            console.log('Error en POST / servicios', err);

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });

            next();
        };
    };

};