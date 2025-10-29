import { conexion } from './conexion.js';

export default class Salones {

    //Buscar todos los salones
    buscarSalones = async () => {
        const [resultado] = await conexion.execute('SELECT * FROM salones WHERE activo= 1');
        return resultado;
    };

    //Buscar salones por id
    buscarPorId = async (id) => {
        const salonId = Number(id);

        try {
            const [resultado] = await conexion.execute('SELECT * FROM salones WHERE salon_id = ? AND activo = 1', [salonId]);
            return resultado[0] ?? null;

        } catch (err) {
            throw new Error(err);           
        }
    };

    //Desactivar salon 
    desactivarSalon = async (salonId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE salones SET activo = 0, modificado = NOW() WHERE salon_id = ?', [salonId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    //Activar salon
    activarSalon = async (salonId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE salones SET activo = 1, modificado = NOW() WHERE salon_id = ?', [salonId]);
            return resultado;
        } catch (err) {
            throw new Error(err);
        }
    };

    // Actualizar Salon (los dos campos que no se modifican son activo y fecha de creación )
    actualizarSalon = async (id, datos) => {
        const salonId = Number(id);

        try {
            if (!datos || Object.keys(datos).length === 0) {
                return null;
            }
            const camposAActualizar = Object.keys(datos);
            const valoresAActualizar = Object.values(datos);
            const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');

            const sql = `UPDATE salones SET ${setValores}, modificado = NOW() WHERE salon_id = ?`;

            const [resultado] = await conexion.execute(sql, [...valoresAActualizar, salonId]);

            if (resultado.affectedRows === 0) {
                return null;
            }

            return await this.buscarPorId(salonId);

        } catch (error) {
            throw new Error(`Error al actualizar el salón: ${error.message}`);
        }
    };

    //Crear salon
    crearSalon = async (salon) => {
        const sql = `
            INSERT INTO salones (
                titulo, 
                direccion, 
                latitud, 
                longitud, 
                capacidad, 
                importe, 
                activo
            ) VALUES (?, ?, ?, ?, ?, ?, 1)
        `;

        const [resultado] = await conexion.execute(sql, [
            salon.titulo,
            salon.direccion,
            salon.latitud,
            salon.longitud,
            salon.capacidad,
            salon.importe
        ]);

        if (resultado.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(resultado.insertId);
    };
};