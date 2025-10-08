// import * as usuariosBD from '../models/usuariosModelos.js';

// export async function inicializarAdmin() {
//   try {
//     const adminExiste = await usuariosBD.buscarUsuarioPorEmail(process.env.ADMIN_EMAIL);

//     if (adminExiste) {
//       console.log("El admin ya existe, no se crea ✅");
//       return;
//     }

//     await usuariosBD.crearUsuario({
//       nombre: process.env.ADMIN_NOMBRE,
//       apellido: process.env.ADMIN_APELLIDO,
//       nombre_usuario: process.env.ADMIN_EMAIL,
//       contrasenia: process.env.ADMIN_PASS,
//       tipo_usuario: 1,
//       activo: 1
//     });

//     console.log("Admin creado automáticamente ✅");

//   } catch (error) {
//     console.error("Error al crear admin:", error);
//   }
// }

  