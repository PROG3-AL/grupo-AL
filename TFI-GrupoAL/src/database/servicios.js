import { conexion } from './conexion.js';

export default class Servicios {

    //Buscar todos los servicios
    buscarServicios = async () => {
        const [resultado] = await conexion.execute('SELECT * FROM servicios WHERE activo= 1');
        return resultado;
    };

    //Buscar servicio por id
    buscarPorId = async (id) => {
        const servicioId = Number(id);

        const [resultado] = await conexion.execute('SELECT * FROM servicios WHERE servicio_id = ?', [servicioId]);
        return resultado[0] ?? null;
    };

    buscarServicioPorNombre = async (descipcionServicio) => {
        //Si el servicio ya existe, rechazarlo
        const [servicioExiste] = await conexion.execute(`SELECT * FROM servicios WHERE descripcion = ?`, [descipcionServicio]);
        return servicioExiste[0] ?? null;
    };

    //Desactivar servicio 
    desactivarServicio = async (servicioId) => {
        const [resultado] = await conexion.execute(
            'UPDATE servicios SET activo = 0, modificado = NOW() WHERE servicio_id = ?', [servicioId]);
        return resultado;
    };

    //Activar servicio
    activarServicio = async (servicioId) => {
        const [resultado] = await conexion.execute(
            'UPDATE servicios SET activo = 1, modificado = NOW() WHERE servicio_id = ?', [servicioId]);
        return resultado;
    };

    // Actualizar servicio (los dos campos que no se modifican son activo y fecha de creación )
    actualizarServicio = async (id, datos) => {
        const servicioId = Number(id);

        if (!datos || Object.keys(datos).length === 0) {
            return null;
        }

        const camposAActualizar = Object.keys(datos);
        const valoresAActualizar = Object.values(datos);
        const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');

        const sql = `UPDATE servicios SET ${setValores}, modificado = NOW() WHERE servicio_id = ?`;

        const [resultado] = await conexion.execute(sql, [...valoresAActualizar, servicioId]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return await this.buscarPorId(servicioId);
    };

    //Crear servicio
    crearServicio = async (nuevoServicio) => {

        const sql = `
            INSERT INTO servicios (
                descripcion,
                importe,
                activo
            ) VALUES (?, ?, ?)
        `;

        const [resultado] = await conexion.execute(sql, [
            nuevoServicio.descripcion,
            nuevoServicio.importe,
            nuevoServicio.activo
        ]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(resultado.insertId);
    };
};