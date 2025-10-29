import { conexion } from './conexion.js';

export default class Reservas {

    //Buscar todas las reservas
    buscarReservas = async () => {
        const [resultado] = await conexion.execute('SELECT * FROM reservas WHERE activo = 1');
        console.log(resultado);
        return resultado;
    };

    //Buscar reserva por id
    buscarPorId = async (id) => {
        const reservaId = Number(id);

        try {
            const [resultado] = await conexion.execute('SELECT * FROM reservas WHERE reserva_id = ? AND activo = 1', [reservaId]);
            return resultado[0] ?? null;

        } catch (err) {
            throw new Error(err);           
        }
    };

    //Desactivar reserva
    desactivarReserva = async (reservaId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE reservas SET activo = 0 WHERE reserva_id = ?', [reservaId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    //Activar reserva
    activarReserva = async (reservaId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE reservas SET activo = 1 WHERE reserva_id = ?', [reservaId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    // Actualizar Reserva (los dos campos que no se modifican son activo y fecha de creación )
    actualizarReserva = async (id, datos) => {
        const reservaId = Number(id);

        try {
            if (!datos || Object.keys(datos).length === 0) {
                return null;
            }
            const camposAActualizar = Object.keys(datos);
            const valoresAActualizar = Object.values(datos);
            const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');

            const sql = `UPDATE reservas SET ${setValores} WHERE reserva_id = ?`;

            const [resultado] = await conexion.execute(sql, [...valoresAActualizar, reservaId]);

            if (resultado.affectedRows === 0) {
                return null;
            }

            return await this.buscarPorId(reservaId);

        } catch (error) {
            throw new Error(`Error al actualizar la reserva: ${error.message}`);
        }
    };

    //Crear reserva
    crearReserva = async (reserva) => {
        const sql = `
            INSERT INTO reservas (
                fecha_reserva, 
                salon_id, 
                usuario_id, 
                turno_id, 
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await conexion.execute(sql, [
            reserva.fecha_reserva,
            reserva.salon_id,
            reserva.usuario_id,
            reserva.turno_id,
            reserva.foto_cumpleaniero,
            reserva.tematica,
            reserva.importe_salon,
            reserva.importe_total
        ]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(resultado.insertId);
        
    };

    // con esta sentencia obtengo los datos desde la bd para la notificación, los renombro porque en la plantilla handlebars
    // usamos los campos como fecha, salon y turno.
    datosParaNotificacion = async(reserva_id) => {
            const sql = `SELECT r.fecha_reserva as fecha, s.titulo as salon, t.orden as turno
                FROM reservas as r
                INNER JOIN  salones as s on s.salon_id = r.salon_id 
                INNER JOIN  turnos as t on t.turno_id = r.turno_id
                WHERE r.activo = 1 and r.reserva_id = ?`;

            const [reserva] = await conexion.execute(sql, [reserva_id]);
            if(reserva.length === 0){
                return null;
            }

            return reserva[0];
        }

};



