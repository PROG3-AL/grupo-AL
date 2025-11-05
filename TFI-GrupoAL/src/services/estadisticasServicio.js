import Estadisticas from "../database/estadisticas.js";

class EstadisticasServicio {
  constructor() {
    this.estadisticas = new Estadisticas();
  }

  obtenerSalonesMasReservados = async () => {
    try {
      const salones = await this.estadisticas.obtenerSalonesMasReservados();
      return salones;
    } catch (error) {
      throw error;
    }
  };

  obtenerServiciosMasSolicitados = async () => {
    try {
      const servicios = await this.estadisticas.obtenerServiciosMasSolicitados();
      return servicios;
    } catch (error) {
      throw error;
    }
  };

  obtenerTurnosMasReservados = async () => {
    try {
      const turnos = await this.estadisticas.obtenerTurnosMasReservados();
      return turnos;
    } catch (error) {
      throw error;
    }
  };

}

export default EstadisticasServicio;