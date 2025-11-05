import EstadisticasServicio from "../services/estadisticasServicio.js";

export default class EstadisticasControlador {

    constructor() {
        this.estadisticasServicio = new EstadisticasServicio();
    };

    obtenerSalonesMasReservados = async (req, res, next) => {
        try {
            const salones = await this.estadisticasServicio.obtenerSalonesMasReservados();
            res.json({
                estado: true,
                datos: salones
            });
        } catch (err) {
            console.log('Error en GET /estadisticas/salones-mas-reservados', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
            next();
        };
    };

    obtenerServiciosMasSolicitados = async (req, res, next) => {
        try {
            const servicios = await this.estadisticasServicio.obtenerServiciosMasSolicitados();
            res.json({
                estado: true,
                datos: servicios
            });
        } catch (err) {
            console.log('Error en GET /estadisticas/servicios-mas-solicitados', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
            next();
        };
    };

    obtenerTurnosMasReservados = async (req, res, next) => {
        try {
            const turnos = await this.estadisticasServicio.obtenerTurnosMasReservados();
            res.json({
                estado: true,
                datos: turnos
            });
        } catch (err) {
            console.log('Error en GET /estadisticas/turnos-mas-reservados', err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });
            next();
        };
    };

};