import { conexion } from './conexion.js';

export default class Usuarios {

    // Buscar todos los usuarios
    buscarUsuarios = async () => {
        const [resultados] = await conexion.query('SELECT * FROM usuarios WHERE activo = 1'); //conexion.query cuando no hay paramtros que pasar(mas eficiente)
        return resultados; 
    };

    //Buscar Usuarios por Id
    buscarPorId = async (id) => {
        const usuarioId = Number(id);

        try {
             const [resultados] = await conexion.execute('SELECT * FROM usuarios WHERE usuario_id = ?', [usuarioId]);
             return resultados[0] ?? null;
         } catch (err) {
             throw new Error(err);
            }
    };

    //Buscar usuario por Email
    buscarUsuarioPorEmail = async (nombre_usuario) => {
        try {
             const [resultados] = await conexion.execute('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
             return resultados[0] ?? null; // devuelve null si no encuentra nada
           } catch (err) {
            console.error("Error al buscar usuario por email:", err);
            throw err; 
           }   
    };

    //Crea un usuario
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

    //desactivar Usuario
    desactivarUsuario = async (usuarioId) =>  {
        try  {
            const [resultado] = await conexion.execute(
                'UPDATE usuarios SET activo = 0 WHERE usuario_id = ?', [usuarioId]);
                return resultado;
        } catch (err) {
            console.error('Error al desactivar Usuario:', err.message);
            throw err;
        }
    };

    //Activar Usuario
    activarUsuario = async (usuarioId) => {
        try  {
            const [resultado] = await conexion.execute(
                'UPDATE usuarios SET activo = 1 WHERE usuario_id = ?', [usuarioId]);
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

    //Actualizar Usuario
     actualizarUsuario = async (id, datos) => {
    const usuarioId = Number(id);
    if (isNaN(usuarioId)) throw new Error('ID de usuario inválido');

    try {
      if (!datos || Object.keys(datos).length === 0) return null;


      if (datos.contrasenia) {
        datos.contrasenia = { __sha2__: true, value: datos.contrasenia };
      }

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
      }

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

}