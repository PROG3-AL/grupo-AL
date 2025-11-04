import Reservas from '../database/reservas.js';
import ReservasServicios from '../database/reservas_servicios.js';
import NotificacionesService from "./notificacionesServicio.js";
import InformeServicio from './informeServicio.js';


export default class ReservasServicio {
    constructor () {
        this.reserva = new Reservas()
        this.reservas_servicios = new ReservasServicios();
        this.notificaciones_servicio = new NotificacionesService();
        this.informes = new InformeServicio();
    };

    buscarReservas = () => {
        return this.reserva.buscarReservas();
    };

    obtenerServiciosExistentes = (reserva_id) => {
        return this.reservas_servicios.obtenerServiciosExistentes(reserva_id);
    }

    buscarPorId = (id) => {
        return this.reserva.buscarPorId(id); 
    };

    desactivarReserva = (id) => {
        return this.reserva.desactivarReserva(id); 
    };

    activarReserva = (id) => {
        return this.reserva.activarReserva(id); 
    };

    actualizarReserva = async (id, datos) => {
        const existe = await this.reserva.buscarPorId(id);

        if (!existe) {
            return null;
        }
        
        return await this.reserva.actualizarReserva(id, datos);
    };

    crearReserva = async (reserva) => {

       
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total,
            servicios
        } = reserva;

        const nuevaReserva = {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total,
            servicios
        };

       // creo la reserva sola, sin servicios
        const result = await this.reserva.crearReserva(nuevaReserva);

        if (!result) {
            return null;
        }

        // relaciono las tablas 
        await this.reservas_servicios.crear(result.reserva_id, servicios);     

        // obtengo los datos desde la base de datos, poara enviar la noti
        const reservaExistente = await this.reserva.datosParaNotificacion(result.reserva_id);
        const serviciosExistentes = await this.reservas_servicios.obtenerServiciosExistentes(result.reserva_id);
        const datosParaCorreo = {
            reservaExistente,
            servicios: serviciosExistentes
        }
        console.log('DATOS PARA EL CORREO: ', datosParaCorreo);
        
        // instancio notificaciones_servicio y uso el método enviar correo pasándole como parámetro los datos obtenidos de la bd
        await this.notificaciones_servicio.enviarCorreo(datosParaCorreo);
        
        // queda pendiente retornar también los servicios, ahora solo retorna las reservas. debería retornar también un array de servicios.
        return this.reserva.buscarPorId(result.reserva_id);

    };

    crearInforme = async (formato) => {

        const reporteConDatos = await this.reserva.buscarDatosParaReporte();

        if (formato === "pdf") {

            const buffer = await this.informes.informeReservaPdf(reporteConDatos);
            return {
                buffer,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="reporte.pdf"'
                }
            };

        } else if (formato === "csv") {

            const csv = await this.informes.informeReservaCsv(reporteConDatos);

            return {
                path: csv,
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition' : 'attachment; filename = "reporte.csv"'
                }
            };
        }
    };

    buscarReservasPorUsuario = (usuario_id) => {
        return this.reserva.buscarReservasPorUsuario(usuario_id);
    };
};