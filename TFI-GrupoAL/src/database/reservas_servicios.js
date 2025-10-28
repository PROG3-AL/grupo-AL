import { conexion } from "./conexion.js";

export default class ReservasServicios {
    
    // recibe id de la reserva ya creada y los servicios
    crear = async(reserva_id, servicios) => {

        try{
            await conexion.beginTransaction();

            // recorro todos los servicios y los guardo en la base
            for (const servicio of servicios){
                const sql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) 
                    VALUES (?,?,?);`;
                conexion.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe ]);
            }

            // commiteo la transacción
            await conexion.commit();

            return true;

        }catch(error){
            // revierto la transacción si algo salió mal
            await conexion.rollback();
            console.log(`error ${error}`);
            return false;
        }
    }
}


