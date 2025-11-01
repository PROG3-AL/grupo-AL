import Turnos from '../database/turnos.js';

export default class TurnosServicio {
  constructor() {
    this.turnos = new Turnos();
  }

  buscarTurnos = async () => {
    return await this.turnos.buscarTurnos();
  };

  buscarPorId = async (id) => {
    const turno = await this.turnos.buscarPorId(id);
    if (!turno) throw new Error("Turno no encontrado");
    return turno;
  };

  crearTurno = async (datosTurno) => {
    return await this.turnos.crearTurno(datosTurno);
  };

  actualizarTurno = async (id, datosTurno) => {
    const existente = await this.turnos.buscarPorId(id);
    if (!existente) throw new Error("Turno no encontrado");
    await this.turnos.actualizarTurno(id, datosTurno);
    return { id, ...datosTurno };
  };

  desactivarTurno = async (id) => {
    const existente = await this.turnos.buscarPorId(id);
    if (!existente) throw new Error("Turno no encontrado");
    await this.turnos.desactivarTurno(id);
  };

  activarTurno = async (id) => {
    const existente = await this.turnos.buscarPorId(id);
    if (!existente) throw new Error("Turno no encontrado");
    await this.turnos.activarTurno(id);
  };
}