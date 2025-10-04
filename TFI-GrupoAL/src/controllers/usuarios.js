// import * as usuariosBD from '../models/usuariosModelos.js';

// export async function listarUsuarios(req, res, next) {
//     try{
//         const usuarios = await usuariosBD.buscarUsuarios();
//         res.send(usuarios);
//     } catch (err) {
//         next(err);
//     }
// };

// export async function listarUsuarioPorId(req, res, next) {
    
//     if (!req.params) {
//         res.status(400).send({'Estado': false, "mensaje": "Faltan parametros requeridos"})
//     };

//     try {
//         const {id} = req.params;
//         const usuario = await usuariosBD.buscarUsuarioPorId(id);
//         res.send(usuario)
//     } catch (err) {
//         next(err);
//     }
// };

// export async function crearUsuario(req, res, next) {
//     const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, activo = 1 } = req.body;

//     if (!nombre || !apellido || !nombre_usuario || !contrasenia || !tipo_usuario) {
//         return res.status(400).send({
//             estado: false,
//             mensaje: "Faltan datos para crear el usuario"
//         });
//     }

//     try {
//         const resultado = await usuariosBD.crearUsuario({
//             nombre,
//             apellido,
//             nombre_usuario,
//             contrasenia,
//             tipo_usuario,
//             activo: activo ?? 1 // si no mandás activo, por defecto es 1
//         });

//         res.status(201).send({
//             estado: true,
//             mensaje: "Usuario creado con éxito",
//             usuario_id: resultado.insertId
//         });
//     } catch (err) {
//         next(err);
//     }
// };

