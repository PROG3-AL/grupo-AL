import {conexion} from '../../database/conexion.js';

export async function buscarSalones() {
    const [resultados] = await conexion.query('SELECT * FROM salones');
    return resultados;
};
// Se puede modificar para que busque solo salones activos con 'SELECT * FROM salones WHERE activo = 1'

export async function buscarPorId(id) {
    const salonId = Number(id);

    try {
        const [rows] = await conexion.execute('SELECT * FROM salones WHERE salon_id = ?', [salonId]);
        return rows[0] ?? null;
    } catch (err) {
        throw new Error(err);
    }
};

export async function desactivarSalon(salonId) {
    try {
        const [result] = await conexion.execute(
            'UPDATE salones SET activo = 0 WHERE salon_id = ?', [salonId]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

export async function activarSalon(salonId) {
    try {
        const [result] = await conexion.execute(
            'UPDATE salones SET activo = 1 WHERE salon_id = ?', [salonId]);
        return result;
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

export async function crearSalon(salon) {
    const [resultado] = await conexion.query(
        `INSERT INTO salones (
            titulo, 
            direccion, 
            latitud, 
            longitud, 
            capacidad, 
            importe,
            activo
        ) VALUES (?, ?, ?, ?, ?, ?, 1)`, 
        [
            salon.titulo,
            salon.direccion, 
            salon.latitud,
            salon.longitud,
            salon.capacidad,
            salon.importe
        ]
    );

    return { id: resultado.insertId, ...salon, activo: 1 };
}
