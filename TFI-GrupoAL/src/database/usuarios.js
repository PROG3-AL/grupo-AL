// import {conexion} from './conexion.js';

// export async function buscarUsuarios() {
//     const [resultados] = await conexion.query('SELECT * FROM usuarios');
//     return resultados; 
// };

// export async function buscarUsuarioPorId(id) {
//     const usuarioId = numer(id);

//     try {
//         const [rows] = await conexion.execute('SELECT * FROM usuarios WHERE usuario_id = ?', [usuarioId]);
//         return rows[0] ?? null;
//     } catch (err) {
//         throw new Error(err);
//     }
// };

// export async function buscarUsuarioPorEmail(nombre_usuario) {
//   try {
//     const [rows] = await conexion.execute('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
//     return rows[0] ?? null; // devuelve null si no encuentra nada
//   } catch (err) {
//     console.error("Error al buscar usuario por email:", err);
//     throw err; // relanza el error
//   }
// }


// export async function crearUsuario(usuario) {
//     // Luego agrego hash y bcrypt
//     const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo = 1 } = usuario;
  
//     try {
//       const [resultado] = await conexion.execute(
//         `INSERT INTO usuarios
//          (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo)
//          VALUES (?, ?, ?, ?, ?, ?)`,
//         [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo]
//       );
  
//       return resultado
//     } catch (err) {
//       throw new Error(err);
//     }
//   }