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