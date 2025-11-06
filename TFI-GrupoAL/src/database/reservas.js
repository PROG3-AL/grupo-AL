import { conexion } from './conexion.js';
import ReservasServicios from './reservas_servicios.js';
import Servicios from './servicios.js';

export default class Reservas {

    constructor() {
        this.reservas_servicios = new ReservasServicios()
        this.servicios = new Servicios()
    }

    buscarReservas = async () => {

            const [reservas] = await conexion.execute('SELECT * FROM reservas WHERE activo = 1');
            const reservasConServicios = await Promise.all(
                reservas.map(async (reserva) => {
        
                const servicios = await this.reservas_servicios.obtenerServiciosExistentes(reserva.reserva_id);
                    return {
                        ...reserva,
                        servicios: servicios.length > 0 ? servicios : null
                    };
                })
            );
        return reservasConServicios;
    };

    buscarPorId = async (id) => {
        const reservaId = Number(id);

        try {
            const [resultado] = await conexion.execute('SELECT * FROM reservas WHERE reserva_id = ? AND activo = 1', [reservaId]);
            return resultado[0] ?? null;

        } catch (err) {
            throw new Error(err);           
        }
    };

    desactivarReserva = async (reservaId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE reservas SET activo = 0 WHERE reserva_id = ?', [reservaId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    activarReserva = async (reservaId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE reservas SET activo = 1 WHERE reserva_id = ?', [reservaId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    actualizarReserva = async (id, datos) => {

        const reservaId = Number(id);

        const {servicios, ...reserva} = datos;

        const reservaValida = reserva && Object.keys(reserva).length > 0;
        const serviciosValidos = Array.isArray(servicios) && servicios.length > 0;

        const conectar = await conexion.getConnection(); 

        try {

            await conectar.beginTransaction();

            if (reservaValida) {
                const camposAActualizar = Object.keys(reserva);
                const valoresAActualizar = Object.values(reserva);
                const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
                const sql = `UPDATE reservas SET ${setValores} WHERE reserva_id = ?`;
                const [resultadosReserva] = await conectar.execute(sql, [...valoresAActualizar, reservaId]);
                if (resultadosReserva.affectedRows === 0) throw new Error('Reserva no encontrada');
            };

            if (serviciosValidos) {
                await this.reservas_servicios.EliminarServiciosExistentes(reservaId, conectar);
                const obtenerDatosServicios = await Promise.all(
                    servicios.map((s_id) => this.servicios.buscarPorId(s_id))
                );
                await this.reservas_servicios.crear(reservaId, obtenerDatosServicios, conectar);
            };

            const reservaFinal = await this.buscarPorId(reservaId);
            const serviciosFinal = await this.reservas_servicios.obtenerServiciosExistentes(reservaId);

            let importe_servicios = 0;
            serviciosFinal.forEach(s => {
                importe_servicios += Number(s.importe)
            });

            let importe_salon = Number(reservaFinal.importe_salon);
            let importe_total = importe_salon + importe_servicios;

            console.log('IMPORTE SALON: ', importe_salon);
            console.log('IMPORTE SERVICIOS: ', importe_servicios);
            console.log('IMPORTE TOTAL: ', importe_total);

            await conectar.execute('UPDATE reservas SET importe_total = ? WHERE reserva_id = ?', [importe_total, reservaId]);

            await conectar.commit();

            const reservas = await this.buscarPorId(reservaId);

            const resultados = {
                reservas,
                servicios: serviciosFinal
            }

            return resultados;

        } catch (err) {
            await conectar.rollback();
            throw err;
        } finally {
            conectar.release();
        }
    };

        crearReserva = async (reserva) => {

        const conectarTransaccion = await conexion.getConnection();

        try {

            await conectarTransaccion.beginTransaction();

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

            const [resultado] = await conectarTransaccion.execute(sql, [
                reserva.fecha_reserva,
                reserva.salon_id,
                reserva.usuario_id,
                reserva.turno_id,
                reserva.foto_cumpleaniero,
                reserva.tematica,
                reserva.importe_salon,
                reserva.importe_total
            ]);

            const idReserva = resultado.insertId;
            if (!idReserva) throw new Error('No se pudo crear la reserva');

            let totalServicios = 0;

            if (reserva.servicios !== null && reserva.servicios.length > 0) {

                const insertarSql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) VALUES (?, ?, ?)`;
                    
                for (const servicio_id of reserva.servicios) {

                    const existe = await this.servicios.buscarPorId(servicio_id, conectarTransaccion);
                    if(!existe) {
                        throw new Error(`El servicio no existe con el id ${servicio_id}`);
                    };

                    const importe = Number(existe.importe);
                    totalServicios += importe;

                    await conectarTransaccion.execute(insertarSql, [idReserva, servicio_id, importe]);
                }
            };

            const total = Number(reserva.importe_salon) + Number(totalServicios);
            await conectarTransaccion.execute(`UPDATE reservas SET importe_total = ? WHERE reserva_id = ?`, [total, idReserva]);
            await conectarTransaccion.commit();

            return this.buscarPorId(idReserva);

        } catch (err) {
            await conectarTransaccion.rollback();
            console.error('Error al crear la reserva', err);
            throw err;
        } finally {
            conectarTransaccion.release();
        };
    };

    datosParaNotificacion = async(reserva_id) => {

            const sql = `SELECT 
                r.fecha_reserva as fecha, 
                s.titulo as salon, 
                t.orden as turno,
                t.hora_desde,
                t.hora_hasta,
                u.usuario_id
            FROM reservas as r
            INNER JOIN salones as s on s.salon_id = r.salon_id 
            INNER JOIN turnos as t on t.turno_id = r.turno_id
            INNER JOIN usuarios as u ON r.usuario_id = u.usuario_id
            WHERE r.activo = 1 and r.reserva_id = ?`;

            const [reserva] = await conexion.execute(sql, [reserva_id]);
            if(reserva.length === 0){
                return null;
            }

            return reserva[0];
        }

    buscarDatosParaReporte = async () => {
        const sql = `
            SELECT
            rs.reserva_id,
            rs.fecha_reserva,
            CONCAT(u.nombre, ' ', u.apellido) AS cliente,
            t.orden,
            s.titulo,
            GROUP_CONCAT(DISTINCT serv.descripcion ORDER BY serv.descripcion SEPARATOR ', ') AS servicios,
            rs.importe_total
            FROM reservas rs
            JOIN usuarios u           ON rs.usuario_id = u.usuario_id
            JOIN turnos t             ON rs.turno_id  = t.turno_id
            JOIN salones s            ON rs.salon_id  = s.salon_id
            JOIN reservas_servicios r ON rs.reserva_id = r.reserva_id
            JOIN servicios serv       ON r.servicio_id = serv.servicio_id
            GROUP BY
            rs.reserva_id, rs.fecha_reserva, cliente,
            t.orden, s.titulo, rs.importe_total;
        `;
        const [resultado] = await conexion.execute(sql);
        return resultado;
    };

    buscarReservasPorUsuario = async (usuario_id) => {
        const [reservas] = await conexion.execute(
            'SELECT * FROM reservas WHERE activo = 1 AND usuario_id = ?',
            [usuario_id]
        );

        const reservasConServicios = await Promise.all(
            reservas.map(async (reserva) => {
                const servicios = await this.reservas_servicios.obtenerServiciosExistentes(reserva.reserva_id);
                return {
                        ...reserva,
                        servicios: servicios.length > 0 ? servicios : null
                };
            })
        );

        return reservasConServicios;
    };
};