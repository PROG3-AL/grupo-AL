import ReservasServicio from "../services/reservasServicio.js";

export default class ServiciosControlador {

    constructor () {
        this.reservasServicio = new ReservasServicio();
    };

    //Funcion para mostrar todas las reservas
    listarReservas = async (req, res, next) => {

        try{

            const reservas = await this.reservasServicio.buscarReservas();
            res.json({
                estado: true,
                datos: reservas
            });

        } catch (err) {

            console.log('Error en GET /reservas', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };

    };

    //Funcion para listar reservas por id
    listarReservaPorId = async (req, res, next) => {
    
        if (!req.params.id) {
            return res.status(400).json({
                estado: false,
                mensaje: "Falta el ID de la reserva"
            });
        }

        try{
            const {id} = req.params;
            const reserva = await this.reservasServicio.buscarPorId(id);

        if (!reserva) {
            return res.status(404).json({
                estado: false,
                mensaje: "Reserva no encontrada o inactiva"
            });
        }
        
            res.json({
                estado: true,
                datos: reserva
            });
            
        } catch (err) {

            console.log("Error en GET /reserva/reserva_id", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    //Funcion para desactivar/eliminar la reserva
    desactivarReserva = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID de la reserva a desactivar"
            });
        };

        try {

            const { id } = req.params;
            
            // Verificar que la reserva existe y está activa
            const reservaExistente = await this.reservasServicio.buscarPorId(id);

            if (!reservaExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Reserva no encontrada o ya está desactivado"
                });
            }

            // Verificar si ya está desactivada
            if (reservaExistente.activo === 0) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "La reserva ya se encuentra desactivada"
                });
            }

            await this.reservasServicio.desactivarReserva(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Reserva desactivada correctamente"
            });

        } catch (err) {

            console.log("Error al 'eliminar' la reserva", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    activarReserva = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID de la reserva a activar"
            });
        };

        try {
            const { id } = req.params;
            
            // Verificar que la reserva existe
            const reservaExistente = await this.reservasServicio.buscarPorId(id);

            if (!reservaExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Reserva no encontrada"
                });
            };

            // Verificar si ya está activa
            if (salonExistente.activo === 1) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "La reserva ya está activa - No es necesario reactivarla"
                });
            };

            // Activarla
            await this.reservasServicio.activarReserva(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Reserva activada correctamente"
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

    //Funcion para actualizar la reserva
    actualizarReserva = async (req, res, next) => {
        if (!req.params.id || !req.body) {
            return res.status(400).send({ 
                estado: false, 
                mensaje: "Faltan datos requeridos" 
            });
        }

        try {
            const { id } = req.params;

            // Actualizar la reserva y obtener el objeto completo
            const actualizado = await this.reservasServicio.actualizarReserva(id, req.body);

            if (!actualizado) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "No se encontró la reserva a actualizar"
                });
            }

            res.json({
                estado: true,
                mensaje: "Reserva actualizada correctamente",
                datos: actualizado
            });

        } catch (err) {
            console.log('Error en PUT /reservas/:reservas_id', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
            next();
        }
    };

    crearReserva = async (req, res, next) => {

        if (!req.body || !req.body.fecha_reserva || !req.body.salon_id || !req.body.turno_id
        ) { //AGREGAR LOS CAMPOS QUE FALTAN
            return res.status(400).send({
                estado: false,
                mensaje: "Faltan datos requeridos para crear la reserva (fecha de reserva, salón_id, turno_id)"
            });
        }

        try {
            const nuevaReserva = {
                fecha_reserva: req.body.fecha_reserva,
                salon_id: req.body.salon_id,
                usuario_id: req.body.usuario_id || null, 
                turno_id: req.body.turno_id,
                foto_cumpleaniero: req.body.foto_cumpleaniero || null,
                tematica: req.body.tematica || null,
                importe_salon: req.body.importe_salon || null,
                importe_total: req.body.importe_total || null,  // aquí de alguna manera debería sumarse el importe del salón + los servicios
                servicios: req.body.servicios || []  // si no hay servicios creo un array vacío
            };

            const reservaCreada = await this.reservasServicio.crearReserva(nuevaReserva);

            res.status(201).send({
                estado: true,
                mensaje: "Reserva creada correctamente",
                data: reservaCreada
            });

        } catch (err) {

            console.log('Error en POST /reservas/', err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

};
