// import {conexion} from './conexion.js';

export default class Usuarios {

    // Buscar todos los usuarios
    buscarUsuarios = async () => {
        const [resultados] = await conexion.query('SELECT * FROM usuarios'); //conexion.quiery cuando no hay paramoetros que pasar(mas eficiente)
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
            throw err; // relanza el error
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
            ) VALUES (?, ?, ?, ?, ?, 1)
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
        };

        return await this.buscarPorId(resultado.insertId)
    } catch (err) {
        console.error('Error al crear el usuario:', err.message);
        throw err
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

    //Actualizar Usuario
    actualizarUsuario = async (id, datos) => {
        const usuarioId = Number(id);
        if (isNaN(usuarioId)) throw new Error('ID de usuario inválido');
      
        try {
          if (!datos || Object.keys(datos).length === 0) return null;
      
          // Filtrar campos que no se modifican
          const camposAActualizar = Object.keys(datos).filter(
            campo => !['usuario_id', 'activo', 'fecha_creacion'].includes(campo)
          );
      
          if (camposAActualizar.length === 0) return null;
      
          const valoresAActualizar = camposAActualizar.map(campo => datos[campo]);
      
          const setValores = camposAActualizar.map(campo => `${campo} = ?`).join(', ');
          const sql = `UPDATE usuarios SET ${setValores} WHERE usuario_id = ?`;
      
          const [resultado] = await conexion.execute(sql, [...valoresAActualizar, usuarioId]);
      
          if (resultado.affectedRows === 0) return null;
      
          return await this.buscarPorId(usuarioId);
      
        } catch (error) {
          throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
      };
      

}