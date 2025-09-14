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

//export async function actualizarSalon(salonId, datos) {
//    const { titulo, direccion, capacidad, importe } = datos;
//    try {
//        const [result] = await conexion.execute(
//            `UPDATE salones 
//            SET titulo = ?, direccion = ?, capacidad = ?, importe = ?, modificado = NOW()
//            WHERE salon_id = ?`,
//            [titulo, direccion, capacidad, importe, salonId]
//        );
//        return result;
//    } catch (err) {
//        throw new Error(err);
//    }
//};