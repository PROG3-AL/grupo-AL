import { conexion } from "./conexion.js";

class Estadisticas {
  obtenerSalonesMasReservados = async () => {
    try {
      const [resultado] = await conexion.query("CALL sp_salones_mas_reservados()");
      return resultado[0];
    } catch (error) {
      throw error;
    }
  };

  obtenerServiciosMasSolicitados = async () => {
    try {
      const [resultado] = await conexion.query("CALL sp_servicios_mas_solicitados()");
      return resultado[0];
    } catch (error) {
      throw error;
    }
  };


  
  obtenerTurnosMasReservados = async () => {
    try {
      const [resultado] = await conexion.query("CALL sp_turnos_mas_reservados()");
      return resultado[0];
    } catch (error) {
      throw error;
    }
  };

}

export default Estadisticas;