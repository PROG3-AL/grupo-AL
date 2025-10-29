import Reservas from '../database/reservas.js';
import ReservasServicios from '../database/reservas_servicios.js';
import NotificacionesService from "./notificacionesServicio.js";


export default class ReservasServicio {
    constructor () {
        this.reserva = new Reservas()
        this.reservas_servicios = new ReservasServicios();
        this.notificaciones_servicio = new NotificacionesService();
    };

    buscarReservas = () => {
        return this.reserva.buscarReservas();
    };

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
            servicios } = reserva;

        const nuevaReserva = {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total
        }    
       // creo la reserva sola, sin servicios
        const result = await this.reserva.crearReserva(nuevaReserva);

        if (!result) {
            return null;
        }

        // relaciono las tablas 
        this.reservas_servicios.crear(result.reserva_id, servicios);     

        // obtengo los datos desde la base de datos, poara enviar la noti
        const datosParaCorreo = await this.reserva.datosParaNotificacion(result.reserva_id);
        
        // instancio notificaciones_servicio y uso el método enviar correo pasándole como parámetro los datos obtenidos de la bd
        await this.notificaciones_servicio.enviarCorreo(datosParaCorreo);
        
        // queda pendiente retornar también los servicios, ahora solo retorna las reservas. debería retornar también un array de servicios.
        return this.reserva.buscarPorId(result.reserva_id);

    };
};
