import {conexion} from '../../database/conexion.js';

export async function buscarSalones() {
    const [resultados] = await conexion.query('SELECT * FROM salones');
    return resultados;
};

export async function buscarPorId(id) {
    const salonId = Number(id);

    try {
        const [rows] = await conexion.execute('SELECT * FROM salones WHERE salon_id = ?', [salonId]);
        return rows[0] ?? null;
    } catch (err) {
        throw new Error(err);
    }
};

// Actualizar Salon (los dos campos que no se modifican son activo y fecha de creación )
export async function actualizarSalon(id, datos) {
    const salonId = Number(id);

    try {
        const { 
            titulo, 
            direccion, 
            latitud, 
            longitud, 
            capacidad, 
            importe
        } = datos;

        const [resultados] = await conexion.execute(
            `UPDATE salones 
             SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, 
                 capacidad = ?, importe = ?, 
                 modificado = CURRENT_TIMESTAMP
             WHERE salon_id = ?`,
            [titulo, direccion, latitud, longitud, capacidad, importe, salonId]
        );

        return resultados.affectedRows > 0;
    } catch (err) {
        throw new Error(err);
    }
};