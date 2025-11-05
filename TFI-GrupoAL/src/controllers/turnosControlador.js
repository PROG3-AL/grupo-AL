import TurnosServicio from '../services/turnosServicio.js';
import apicache from 'apicache';


const apicacheInstance = apicache.newInstance();

export default class TurnosControlador {
  constructor() {
    this.turnosServicio = new TurnosServicio();
  }

  listarTurnos = async (req, res, next) => {
    try {
      const turnos = await this.turnosServicio.buscarTurnos();

      // Si no hay turnos
      if (!turnos || turnos.length === 0) {
        return res.status(404).json({
          estado: false,
          mensaje: "No tiene turnos registrados",
        });
      }

      res.status(200).json({
        estado: true,
        turnos,
      });
    } catch (error) {
      console.error("Error en GET /turnos:", error.message);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno del servidor",
      });
    }
  };

  buscarPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const turno = await this.turnosServicio.buscarPorId(id);

      if (!turno) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado"
        });
      }

      res.status(200).json({
        estado: true,
        turno
      });

    } catch (error) {
      console.error("Error en buscarPorId:", error.message);
      res.status(404).json({
        estado: false,
        mensaje: "Turno no encontrado"
      });
    }
  };

  crearTurno = async (req, res, next) => {
    try {
      const nuevoTurno = await this.turnosServicio.crearTurno(req.body);
      apicacheInstance.clear();
      res.status(201).json({
        estado: true,
        mensaje: "Turno creado correctamente",
        turno: nuevoTurno,
      });
    } catch (error) {
      next(error);
    }
  };

  actualizarTurno = async (req, res, next) => {
    try {
      const { id } = req.params;

      const turnoActualizado = await this.turnosServicio.actualizarTurno(id, req.body);

      if (!turnoActualizado) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado"
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: "Turno actualizado correctamente",
        turno: turnoActualizado,
      });

    } catch (error) {
      console.error("Error en PUT /turnos/:id ->", error.message);

      if (error.message === "Turno no encontrado") {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado"
        });
      }

      res.status(500).json({
        estado: false,
        mensaje: "Error interno del servidor"
      });
    }
  };

  desactivarTurno = async (req, res, next) => {
    try {
      const { id } = req.params;
      const existente = await this.turnosServicio.turnos.buscarPorId(id);

      if (!existente) {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado",
        });
      }

      await this.turnosServicio.desactivarTurno(id);

      apicacheInstance.clear();

      res.status(200).json({
        estado: true,
        mensaje: "Turno desactivado correctamente",
      });
    } catch (error) {
      console.error("Error en PATCH /turnos/:id/desactivar ->", error.message);

      if (error.message === "Turno no encontrado") {
        return res.status(404).json({
          estado: false,
          mensaje: "Turno no encontrado",
        });
      }

      res.status(500).json({
        estado: false,
        mensaje: "Error interno del servidor",
      });
    }
  };
}