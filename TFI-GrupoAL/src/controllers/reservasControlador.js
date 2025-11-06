import ReservasServicio from "../services/reservasServicio.js";
import Servicios from "../services/serviciosServicio.js";
import Salones from "../services/salonesServicio.js";

export default class ServiciosControlador {

    constructor () {
        this.reservasServicio = new ReservasServicio();
        this.servicios = new Servicios();
        this.salones = new Salones();
    };

    listarReservas = async (req, res, next) => {

        try{

            console.log("Usuario autenticado:", req.usuario);

            let reservas;

            if (req.usuario && req.usuario.tipo_usuario === 3){
                reservas = await this.reservasServicio.buscarReservasPorUsuario(req.usuario.id);
            } else {
                reservas = await this.reservasServicio.buscarReservas();
            }
            
            if (!reservas || reservas.length === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: "No hay reservas registradas :("
                });
            }
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

        const servicios = await this.reservasServicio.obtenerServiciosExistentes(id);
        console.log(servicios);

        if (!reserva) {
            return res.status(404).json({
                estado: false,
                mensaje: "Reserva no encontrada o inactiva"
            });
        }
        
            res.json({
                estado: true,
                datos: reserva,
                servicios: servicios
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

    desactivarReserva = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID de la reserva a desactivar"
            });
        };

        try {

            const { id } = req.params;
            
            const reservaExistente = await this.reservasServicio.buscarPorId(id);

            if (!reservaExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Reserva no encontrada o ya está desactivado"
                });
            }

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
            
            const reservaExistente = await this.reservasServicio.buscarPorId(id);

            if (!reservaExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Reserva no encontrada"
                });
            };

            if (salonExistente.activo === 1) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "La reserva ya está activa - No es necesario reactivarla"
                });
            };

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

    actualizarReserva = async (req, res, next) => {
        if (!req.params.id || !req.body) {
            return res.status(400).send({ 
                estado: false, 
                mensaje: "Faltan datos requeridos" 
            });
        }

        if (req.body.servicios && req.body.servicios.length > 0) {
            const servicios = req.body.servicios;
            const obtenerServiciosIds = await this.servicios.buscarServicios();
            console.log('ObtenerServiciosIds: ', obtenerServiciosIds)
            servicios.forEach(s_id => {
                const existe = obtenerServiciosIds.find(s => s.servicio_id === s_id);
                if (!existe) {
                    return res.status(400).json({
                        estado: false,
                        mensaje: `El servicio con ID ${s_id} no existe`
                    });
                }
            });
        };

        try {
            const { id } = req.params;

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
        ) { 
            return res.status(400).send({
                estado: false,
                mensaje: "Faltan datos requeridos para crear la reserva (fecha de reserva, salón_id, turno_id)"
            });
        }

        if (req.body.servicios && req.body.servicios.length > 0) {
            const servicios = req.body.servicios;
            const obtenerServiciosIds = await this.servicios.buscarServicios();
            console.log('ObtenerServiciosIds: ', obtenerServiciosIds)
            servicios.forEach(s_id => {
                const existe = obtenerServiciosIds.find(s => s.servicio_id === s_id);
                if (!existe) {
                    return res.status(400).json({
                        estado: false,
                        mensaje: `El servicio con ID ${s_id} no existe`
                    });
                }
            });
        };

        const salon = await this.salones.buscarPorId(req.body.salon_id);

        if (!salon) {
            return res.status(404).json({
                estado: false,
                mensaje: 'El salon con ID no existe'
            });
        };

        const precioSalon = salon.importe;

        try {
            const nuevaReserva = {
                fecha_reserva: req.body.fecha_reserva,
                salon_id: req.body.salon_id,
                usuario_id: req.body.usuario_id || null, 
                turno_id: req.body.turno_id,
                foto_cumpleaniero: req.body.foto_cumpleaniero || null,
                tematica: req.body.tematica || null,
                importe_salon: precioSalon,
                importe_total: req.body.importe_total || null, 
                servicios: req.body.servicios || []  
            };

            const reservaCreada = await this.reservasServicio.crearReserva(nuevaReserva);
            const obtenerServiciosExistentes = await this.reservasServicio.obtenerServiciosExistentes(reservaCreada.reserva_id);

            res.status(201).send({
                estado: true,
                mensaje: "Reserva creada correctamente",
                data: {
                    reservaCreada,
                    servicios: obtenerServiciosExistentes
                }
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

    crearInforme = async (req, res, next) => {

        try {

            const formato = req.query.formato;

            if (formato !== 'csv' && formato !== 'pdf') {
                return res.status(400).send(
                    {
                        estado: false,
                        mensaje: "El formato no es valido"
                    }
                )
            };

            const {buffer, path, headers} = await this.reservasServicio.crearInforme(formato);

            if (formato === 'pdf') {
                res.set(headers);
                res.status(200).end(buffer);
            } else if (formato === 'csv') {
                return res.download(path, 'reporte.csv', (err) => {
                    if (err) {
                        console.error('Error al enviar CSV:', err);
                        if (!res.headersSent) return next(err);
                    }
                })
            }

        } catch (err) {
            console.error('Error en crearInforme:', err);
            return res.status(500).json({ estado:false, mensaje:'Error interno del servidor' });
        }
    }
};