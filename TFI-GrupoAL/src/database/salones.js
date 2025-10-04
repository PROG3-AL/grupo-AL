import { conexion } from './conexion.js';

export default class Salones {

    //Buscar todos los salones
    buscarSalones = async () => {
        const [resultados] = await conexion.execute('SELECT * FROM salones');
        return resultados;
    };

    //Buscar salones por id
    buscarPorId = async (id) => {
        const salonId = Number(id);

        try {
            const [resultado] = await conexion.execute('SELECT * FROM salones WHERE salon_id = ?', [salonId]);
            return resultado[0] ?? null;

        } catch (err) {
            throw new Error(err);           
        }
    };

    //Desactivar salon 
    desactivarSalon = async (salonId) => {
        try {
            const [result] = await conexion.execute(
                'UPDATE salones SET activo = 0 WHERE salon_id = ?', [salonId]);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    };

    //Activar salon
    activarSalon = async (salonId) => {
        try {
            const [result] = await conexion.execute(
                'UPDATE salones SET activo = 1 WHERE salon_id = ?', [salonId]);
            return result;
        } catch (err) {
            throw new Error(err);
        }
    };

    // Actualizar Salon (los dos campos que no se modifican son activo y fecha de creación )
    actualizarSalon = async (id, datos) => {
        const salonId = Number(id);

        try {
            const { titulo, direccion, latitud, longitud, capacidad, importe } = datos;

            // Actualizar el salón
            await conexion.execute(
                `UPDATE salones 
                SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, 
                    capacidad = ?, importe = ?
                WHERE salon_id = ?`,
                [titulo, direccion, latitud, longitud, capacidad, importe, salonId]
            );

            // Reutilizar buscarPorId para obtener el salon modificado
            return await this.buscarPorId(salonId);

        } catch (err) {
            throw new Error(err);
        }
    };

    //Crear salon
    crearSalon = async (salon) => {
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
    };
};