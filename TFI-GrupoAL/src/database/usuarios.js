import { conexion } from './conexion.js';

export default class Usuarios {

    buscarUsuarios = async () => {
        const [resultados] = await conexion.query('SELECT * FROM usuarios WHERE activo = 1');
        return resultados;
    };

    buscarPorId = async (id) => {
        const usuarioId = Number(id);

        try {
            const [resultados] = await conexion.execute('SELECT * FROM usuarios WHERE usuario_id = ?', [usuarioId]);
            return resultados[0] ?? null;
        } catch (err) {
            throw new Error(err);
        }
    };

    buscarUsuarioPorEmail = async (nombre_usuario) => {
        try {
            const [resultados] = await conexion.execute('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
            return resultados[0] ?? null;
        } catch (err) {
            console.error("Error al buscar usuario por email:", err);
            throw err;
        }
    };

    crearUsuario = async (usuario) => {
        const sql = `
            INSERT INTO usuarios (
                nombre,
                apellido,
                nombre_usuario,
                contrasenia,
                tipo_usuario,
                activo
            )
            VALUES (?, ?, ?, SHA2(?, 256), ?, 1)
        `;

        try {
            const [resultado] = await conexion.execute(sql, [
                usuario.nombre,
                usuario.apellido,
                usuario.nombre_usuario,
                usuario.contrasenia,
                usuario.tipo_usuario
            ]);

            if (resultado.affectedRows === 0) {
                return null;
            }

            return await this.buscarPorId(resultado.insertId);

        } catch (err) {
            console.error('Error al crear el usuario:', err.message);
            throw err;
        }
    };

    desactivarUsuario = async (usuarioId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE usuarios SET activo = 0, modificado = NOW() WHERE usuario_id = ? AND activo = 1',
                [usuarioId]
            );
            return resultado;
        } catch (err) {
            console.error('Error al desactivar Usuario:', err.message);
            throw err;
        }
    };

    activarUsuario = async (usuarioId) => {
        try {
            const [resultado] = await conexion.execute(
                'UPDATE usuarios SET activo = 1, modificado = NOW() WHERE usuario_id = ? AND activo = 0',
                [usuarioId]
            );
            return resultado;
        } catch (err) {
            console.error('Error al activar Usuario:', err.message);
            throw err;
        }

    };

    buscarUsuarioLogin = async (nombre_usuario, contrasenia) => {
        const sql = `
            SELECT * 
            FROM usuarios 
            WHERE nombre_usuario = ? 
            AND contrasenia = SHA2(?, 256) 
            AND activo = 1
        `;
        const [resultado] = await conexion.execute(sql, [nombre_usuario, contrasenia]);
        return resultado[0] ?? null;
    };

    actualizarUsuario = async (id, datos) => {
        const usuarioId = Number(id);
        if (isNaN(usuarioId)) throw new Error('ID de usuario inválido');

        try {
            if (!datos || Object.keys(datos).length === 0) return null;


            if (datos.contrasenia) {
                datos.contrasenia = { __sha2__: true, value: datos.contrasenia };
            };

            const camposAActualizar = Object.keys(datos);
            const valoresAActualizar = [];
            const setPartes = [];

            for (const campo of camposAActualizar) {
                const v = datos[campo];
                if (typeof v === 'object' && v?.__sha2__ === true) {
                    setPartes.push(`${campo} = SHA2(?, 256)`);
                    valoresAActualizar.push(v.value);
                } else {
                    setPartes.push(`${campo} = ?`);
                    valoresAActualizar.push(v);
                }
            };

            const setValores = setPartes.join(', ');
            const sql = `UPDATE usuarios SET ${setValores}, modificado = NOW() WHERE usuario_id = ?`;

            const [resultado] = await conexion.execute(sql, [...valoresAActualizar, usuarioId]);

            if (resultado.affectedRows === 0) {
                return null;
            }

            return await this.buscarPorId(usuarioId);
        } catch (error) {
            console.error('Error al actualizar usuario:', error.message);
            throw error;
        }
    };

    buscarCorreoAdministradores = async () => {
        const [resultados] = await conexion.query('SELECT nombre_usuario FROM usuarios WHERE tipo_usuario = 1');
        return resultados;
    };

};