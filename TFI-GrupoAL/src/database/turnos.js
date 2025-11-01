import { conexion } from './conexion.js';

export default class Turnos {
  // Listar todos los turnos activos
  buscarTurnos = async () => {
    const [resultado] = await conexion.execute('SELECT * FROM turnos WHERE activo = 1');
    return resultado;
  };

  // Buscar turno por ID
  buscarPorId = async (id) => {
    const [resultado] = await conexion.execute('SELECT * FROM turnos WHERE turno_id = ?',[id]);
    return resultado[0];
  };

  // Crear turno
  crearTurno = async (turno) => {
    const { orden, hora_desde, hora_hasta } = turno;
    const [resultado] = await conexion.execute('INSERT INTO turnos (orden, hora_desde, hora_hasta, activo) VALUES (?, ?, ?, 1)',
    [orden, hora_desde, hora_hasta]);
    return { turno_id: resultado.insertId, ...turno, activo: 1 };
  };

  // Actualizar turno
  actualizarTurno = async (id, datos) => {
    const { orden, hora_desde, hora_hasta } = datos;
    await conexion.execute('UPDATE turnos SET orden = ?, hora_desde = ?, hora_hasta = ? WHERE turno_id = ?',
    [orden, hora_desde, hora_hasta, id]);
  };

  // Desactivar turno (borrado lógico)
  desactivarTurno = async (id) => {
    await conexion.execute('UPDATE turnos SET activo = 0 WHERE turno_id = ?', [id]);
  };

  // Activar turno (opcional)
  activarTurno = async (id) => {
    await conexion.execute('UPDATE turnos SET activo = 1 WHERE turno_id = ?', [id]);
  };
}