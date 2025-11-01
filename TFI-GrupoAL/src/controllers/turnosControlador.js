import TurnosServicio from '../services/turnosServicio.js';

export default class TurnosControlador {
  constructor() {
    this.turnosServicio = new TurnosServicio();
  }

  listarTurnos = async (req, res, next) => {
    try {
      const turnos = await this.turnosServicio.buscarTurnos();
      res.status(200).json({ estado: true, turnos });
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const turno = await this.turnosServicio.buscarPorId(id);
      res.status(200).json({ estado: true, turno });
    } catch (error) {
      next(error);
    }
  };

  crearTurno = async (req, res, next) => {
    try {
      const nuevoTurno = await this.turnosServicio.crearTurno(req.body);
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
      const turnoActualizado = await this.turnosServicio.actualizarTurno(
        id,
        req.body
      );
      res.status(200).json({
        estado: true,
        mensaje: "Turno actualizado correctamente",
        turno: turnoActualizado,
      });
    } catch (error) {
      next(error);
    }
  };

  desactivarTurno = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.turnosServicio.desactivarTurno(id);
      res.status(200).json({
        estado: true,
        mensaje: "Turno desactivado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };

  activarTurno = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.turnosServicio.activarTurno(id);
      res.status(200).json({
        estado: true,
        mensaje: "Turno activado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
};