import SalonesServicio from "../services/salonesServicio.js";

export default class SalonesControlador {

    constructor () {
        this.salonesServicio = new SalonesServicio();
    };

    //Funcion para mostrar todos los salones
    listarSalones = async (req, res, next) => {

        try{

            const salones = await this.salonesServicio.buscarSalones();
            // res.render('salones', {salones});
            // console.log('RESULTADOS!', salones);
            // res.send(salones); //Para probarlo con Brunito
            res.send({
                estado: true,
                datos: salones
            });

        } catch (err) {

            console.log("Error al obtener todos los salones", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();

        };

    };

    //Funcion para mostrar solo los salones con un id especifico
    listarSalonPorId = async (req, res, next) => {
    
        if (!req.params) {
            res.status(400).send({'Estado': false, "mensaje": "Faltan los parametros requeridos"})
        };

        try{
            const {id} = req.params;
            const salon = await this.salonesServicio.buscarPorId(id);
            // res.send(salon);
            res.json({
                estado: true,
                datos: salon
            });
        } catch (err) {

            console.log("Error al obtener el salon por id", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    //Funcion para mostrar solo los salones con un id especifico usando el body de Brunito :D
    listarSalonPorIdBody = async (req, res, next) => {

        if (!req.body) {
            res.status(400).send({'Estado': false, "mensaje": "Faltan los datos requeridos"})
        };

        try {
            const {id} = req.body;
            const salon = await this.salonesServicio.buscarPorId(id);
            // res.send(salon);
            res.json({
                estado: true,
                datos: salon
            });
        } catch (err) {

            console.log("Error al obtener el salon por id", err);
            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

    //Funcion para desactivar el salon o "eliminarlo"
    desactivarSalon = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID del salón a desactivar"
            });
        };

        try {

            const { id } = req.params;
            
            // Verificar que el salón existe y está activo
            const salonExistente = await this.salonesServicio.buscarPorId(id);

            if (!salonExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Salón no encontrado o ya está desactivado"
                });
            }

            // Ejecución
            await this.salonesServicio.desactivarSalon(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Salón desactivado correctamente"
            });

        } catch (err) {

            console.log("Error al 'eliminar' el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    //Funcion para "habilitar" el salon -checkear pero es necesario??-
    activarSalon = async (req, res, next) => {

        if (!req.params.id) {
            return res.status(400).send({
                estado: false, 
                mensaje: "Falta el ID del salón a activar"
            });
        };

        try {
            const { id } = req.params;
            
            // Verificar que el salón existe
            const salonExistente = await this.salonesServicio.buscarPorId(id);

            if (!salonExistente) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "Salón no encontrado"
                });
            };

            // Verificar si ya está activo
            if (salonExistente.activo === 1) {
                return res.status(400).send({
                    estado: false,
                    mensaje: "El salón ya está activo - No es necesario reactivarlo"
                });
            };

            // Ejecutar activación
            await this.salonesServicio.activarSalon(id);
            
            res.status(200).json({
                estado: true,
                mensaje: "Salón activado correctamente"
            });

        } catch (err) {

            console.log("Error al 'activar' el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    //Funcion para actualizar el salon
    actualizarSalon = async (req, res, next) => {

        if (!req.params.id || !req.body) {
            return res.status(400).send({ 
                estado: false, 
                mensaje: "Faltan datos requeridos" 
            });
        }

        try {
            const { id } = req.params;
            const actualizado = await this.salonesServicio.actualizarSalon(id, req.body);

            if (!actualizado) {
                return res.status(404).send({
                    estado: false,
                    mensaje: "No se encontró el salón para actualizar"
                });
            }

            res.json({
                estado: true,
                mensaje: "Salón actualizado correctamente"
            });

        } catch (err) {

            console.log("Error al actualizar el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        };
    };

    crearSalon = async (req, res, next) => {

        if (!req.body || !req.body.titulo || !req.body.direccion) {
            return res.status(400).send({
                estado: false,
                mensaje: "Faltan datos requeridos para crear el salón (mínimo título y dirección)"
            });
        }

        try {
            const nuevoSalon = {
                titulo: req.body.titulo,
                direccion: req.body.direccion,
                latitud: req.body.latitud || null,
                longitud: req.body.longitud || null,
                capacidad: req.body.capacidad || null,
                importe: req.body.importe || null,
                activo: 1
            };

            const salonCreado = await this.salonesServicio.crearSalon(nuevoSalon);

            res.status(201).send({
                estado: true,
                mensaje: "Salón creado correctamente",
                data: salonCreado
            });

        } catch (err) {

            console.log("Error al crear el salon", err);

            res.status(500).json({
                estado: false,
                mensaje: "Error interno del servidor"
            });

            next();
        }
    };

};

// export async function listarSalones(req, res, next){
//     try{
//         const salones = await salonesBD.buscarSalones();
//         // res.render('salones', {salones});
//         // console.log('RESULTADOS!', salones);
//         res.send(salones); //Para probarlo con Brunito
//     } catch (err) {
//         next(err);
//     }
// };

// export async function listarSalonPorId (req, res, next) {
    
//     if (!req.params) {
//         res.status(400).send({'Estado': false, "mensaje": "Faltan los parametros requeridos"})
//     };

//     try{
//         const {id} = req.params;
//         const salon = await salonesBD.buscarPorId(id);
//         res.send(salon);
//     } catch (err) {
//         next(err);
//     }
// };

// export async function listarSalonPorIdBody (req, res, next) {

//     if (!req.body) {
//         res.status(400).send({'Estado': false, "mensaje": "Faltan los datos requeridos"})
//     };

//     try {
//         const {id} = req.body;
//         const salon = await salonesBD.buscarPorId(id);
//         res.send(salon);
//     } catch (err) {
//         next(err);
//     }
// };

// export async function desactivarSalon(req, res, next) {
//     if (!req.params.id) {
//         return res.status(400).send({
//             estado: false, 
//             mensaje: "Falta el ID del salón a desactivar"
//         });
//     }

//     try {
//         const { id } = req.params;
        
//         // Verificar que el salón existe y está activo
//         const salonExistente = await salonesBD.buscarPorId(id);
//         if (!salonExistente) {
//             return res.status(404).send({
//                 estado: false,
//                 mensaje: "Salón no encontrado o ya está desactivado"
//             });
//         }

//         // Ejecución
//         await salonesBD.desactivarSalon(id);
        
//         res.status(200).send({
//             estado: true,
//             mensaje: "Salón desactivado correctamente"
//         });
//     } catch (err) {
//         next(err);
//     }
// }

// export async function activarSalon(req, res, next) {
//     if (!req.params.id) {
//         return res.status(400).send({
//             estado: false, 
//             mensaje: "Falta el ID del salón a activar"
//         });
//     }

//     try {
//         const { id } = req.params;
        
//         // Verificar que el salón existe
//         const salonExistente = await salonesBD.buscarPorId(id);
//         if (!salonExistente) {
//             return res.status(404).send({
//                 estado: false,
//                 mensaje: "Salón no encontrado"
//             });
//         }

//         // Verificar si ya está activo
//         if (salonExistente.activo === 1) {
//             return res.status(400).send({
//                 estado: false,
//                 mensaje: "El salón ya está activo - No es necesario reactivarlo"
//             });
//         }

//         // Ejecutar activación
//         await salonesBD.activarSalon(id);
        
//         res.status(200).send({
//             estado: true,
//             mensaje: "Salón activado correctamente"
//         });
//     } catch (err) {
//         next(err);
//     }
// }

// export async function actualizarSalon(req, res, next) {
//     if (!req.params.id || !req.body) {
//         return res.status(400).send({ 
//             estado: false, 
//             mensaje: "Faltan datos requeridos" 
//         });
//     }

//     try {
//         const { id } = req.params;
//         const actualizado = await salonesBD.actualizarSalon(id, req.body);

//         if (!actualizado) {
//             return res.status(404).send({
//                 estado: false,
//                 mensaje: "No se encontró el salón para actualizar"
//             });
//         }

//         res.send({
//             estado: true,
//             mensaje: "Salón actualizado correctamente"
//         });
//     } catch (err) {
//         next(err);
//     }
// }

// export async function crearSalon(req, res, next) {
//     if (!req.body || !req.body.titulo || !req.body.direccion) {
//         return res.status(400).send({
//             estado: false,
//             mensaje: "Faltan datos requeridos para crear el salón (mínimo título y dirección)"
//         });
//     }

//     try {
//         const nuevoSalon = {
//             titulo: req.body.titulo,
//             direccion: req.body.direccion,
//             latitud: req.body.latitud || null,
//             longitud: req.body.longitud || null,
//             capacidad: req.body.capacidad || null,
//             importe: req.body.importe || null,
//             activo: 1
//         };

//         const salonCreado = await salonesBD.crearSalon(nuevoSalon);

//         res.status(201).send({
//             estado: true,
//             mensaje: "Salón creado correctamente",
//             data: salonCreado
//         });
//     } catch (err) {
//         next(err);
//     }
// }
