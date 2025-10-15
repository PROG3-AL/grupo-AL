import SalonesServicio from "../services/salonesServicio.js";

export default class SalonesControlador {

    constructor () {
        this.salonesServicio = new SalonesServicio();
    };

    //Funcion para mostrar todos los salones
    listarSalones = async (req, res, next) => {

        try{

            const salones = await this.salonesServicio.buscarSalones();
            res.json({
                estado: true,
                datos: salones
            });

        } catch (err) {

            console.log('Error en GET /salones', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };

    };

    //Funcion para mostrar solo los salones con un id especifico
    listarSalonPorId = async (req, res, next) => {
    
        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID del salón"
            });
        }

        try{
            const {id} = req.params;
            const salon = await this.salonesServicio.buscarPorId(id);
        
            res.json({
                estado: true,
                datos: salon
            });
        } catch (err) {

            console.log("Error en GET /salones/salon_id", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    //Funcion para desactivar el salon o "eliminarlo"
    desactivarSalon = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID del salón a desactivar"
            });
        };

        try {

            const { id } = req.params;
            
            // Verificar que el salón existe y está activo
            const salonExistente = await this.salonesServicio.buscarPorId(id);

            if (!salonExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Salón no encontrado o ya está desactivado"
                });
            }

            // Verificar si ya está desactivado
            if (salonExistente.activo === 0) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "El salón ya se encuentra desactivado"
                });
            }

            // Ejecución
            await this.salonesServicio.desactivarSalon(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Salón desactivado correctamente"
            });

        } catch (err) {

            console.log("Error al 'eliminar' el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    activarSalon = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID del salón a activar"
            });
        };

        try {
            const { id } = req.params;
            
            // Verificar que el salón existe
            const salonExistente = await this.salonesServicio.buscarPorId(id);

            if (!salonExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Salón no encontrado"
                });
            };

            // Verificar si ya está activo
            if (salonExistente.activo === 1) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "El salón ya está activo - No es necesario reactivarlo"
                });
            };

            // Ejecutar activación
            await this.salonesServicio.activarSalon(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Salón activado correctamente"
            });

        } catch (err) {

            console.log("Error al 'activar' el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    //Funcion para actualizar el salon
    actualizarSalon = async (req, res, next) => {
        if (!req.params.id || !req.body) {
            return res.status(400).send({ 
                estado: false, 
                mensaje: "Faltan datos requeridos" 
            });
        }

        try {
            const { id } = req.params;

            // Actualizar el salón y obtener el registro completo
            const actualizado = await this.salonesServicio.actualizarSalon(id, req.body);

            if (!actualizado) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "No se encontró el salón para actualizar"
                });
            }

            res.json({
                estado: true,
                mensaje: "Salón actualizado correctamente",
                datos: actualizado
            });

        } catch (err) {
            console.log('Error en PUT /salones/:salon_id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
            next();
        }
    };

    crearSalon = async (req, res, next) => {

        if (!req.body || !req.body.titulo || !req.body.direccion) {
            return res.status(400).send({
                estado: false,
                mensaje: "Faltan datos requeridos para crear el salón (mínimo título y dirección)"
            });
        }

        try {
            const nuevoSalon = {
                titulo: req.body.titulo,
                direccion: req.body.direccion,
                latitud: req.body.latitud || null,
                longitud: req.body.longitud || null,
                capacidad: req.body.capacidad || null,
                importe: req.body.importe || null,
                activo: 1
            };

            const salonCreado = await this.salonesServicio.crearSalon(nuevoSalon);

            res.status(201).send({
                estado: true,
                mensaje: "Salón creado correctamente",
                data: salonCreado
            });

        } catch (err) {

            console.log('Error en POST /salones/', err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

};