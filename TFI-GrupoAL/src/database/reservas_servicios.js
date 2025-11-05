import { conexion } from "./conexion.js";

export default class ReservasServicios {
    
    // recibe id de la reserva ya creada y los servicios
    crear = async(reserva_id, servicios, connection = null) => {

        const conectar = connection || await conexion.getConnection();

        try{
            await conectar.beginTransaction();

            // recorro todos los servicios y los guardo en la base
            for (const servicio of servicios){
                const sql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) 
                    VALUES (?,?,?);`;
                await conectar.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe]);
            }

            // commiteo la transacción
            await conectar.commit();

            return true;

        }catch(error){
            // revierto la transacción si algo salió mal
            await conectar.rollback();
            console.log(`error ${error}`);
            return false;
        }
    }

    obtenerServiciosExistentes = async (reserva_id) => {
        const id = Number(reserva_id);

        const sql = `SELECT
        s.descripcion AS nombre_servicio,
        s.importe AS importe
        FROM reservas_servicios rs
        JOIN servicios s
        ON rs.servicio_id = s.servicio_id
        WHERE rs.reserva_id = ?;`;

        const [resultado] = await conexion.execute(sql, [id]);

        return resultado ?? null;
    }

    obtenerServiciosExistentesIds = async (reserva_id) => {
        const id = Number(reserva_id);

        const sql = `
            SELECT rs.reserva_servicio_id
            FROM reservas_servicios rs
            WHERE rs.reserva_id = ?;
        `;

        const [resultado] = await conexion.execute(sql, [id]);

        console.log('Los id de reservas son: ', resultado)

        return Array.isArray(resultado)
            ? resultado.map(r => r.reserva_servicio_id)
            : [];
    };

    EliminarServiciosExistentes = async (id, conectar = null) => {

        const conectarTransaccion = conectar || conexion;
        const sql = `
            DELETE FROM reservas_servicios
            WHERE reserva_id = ?
        `;

        await conectarTransaccion.execute(sql, [id]);

        return;
    }
}