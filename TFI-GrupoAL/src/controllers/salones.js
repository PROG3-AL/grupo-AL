import * as salonesBD from '../models/salonesModelos.js';

export async function listarSalones(req, res, next){
    try{
        const salones = await salonesBD.buscarSalones();
        // res.render('salones', {salones});
        // console.log('RESULTADOS!', salones);
        res.send(salones); //Para probarlo con Brunito
    } catch (err) {
        next(err);
    }
};

export async function listarSalonPorId (req, res, next) {
    
    if (!req.params) {
        res.status(400).send({'Estado': false, "mensaje": "Faltan los parametros requeridos"})
    };

    try{
        const {id} = req.params;
        const salon = await salonesBD.buscarPorId(id);
        res.send(salon);
    } catch (err) {
        next(err);
    }
};

export async function listarSalonPorIdBody (req, res, next) {

    if (!req.body) {
        res.status(400).send({'Estado': false, "mensaje": "Faltan los datos requeridos"})
    };

    try {
        const {id} = req.body;
        const salon = await salonesBD.buscarPorId(id);
        res.send(salon);
    } catch (err) {
        next(err);
    }
};

export async function desactivarSalon(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            estado: false, 
            mensaje: "Falta el ID del salón a desactivar"
        });
    }

    try {
        const { id } = req.params;
        
        // Verificar que el salón existe y está activo
        const salonExistente = await salonesBD.buscarPorId(id);
        if (!salonExistente) {
            return res.status(404).send({
                estado: false,
                mensaje: "Salón no encontrado o ya está desactivado"
            });
        }

        // Ejecucion
        await salonesBD.desactivarSalon(id);
        
        res.status(200).send({
            estado: true,
            mensaje: "Salón desactivado correctamente"
        });
    } catch (err) {
        next(err);
    }
};

export async function activarSalon(req, res, next) {
    if (!req.params.id) {
        return res.status(400).send({
            estado: false, 
            mensaje: "Falta el ID del salón a activar"
        });
    }

    try {
        const { id } = req.params;
        
        // Verificar que el salón existe
        const salonExistente = await salonesBD.buscarPorId(id);
        if (!salonExistente) {
            return res.status(404).send({
                estado: false,
                mensaje: "Salón no encontrado"
            });
        }

        // Verificar si ya está activo
        if (salonExistente.activo === 1) {
            return res.status(400).send({
                estado: false,
                mensaje: "El salón ya está activo - No es necesario reactivarlo"
            });
        }

        // Ejecutar activación
        await salonesBD.activarSalon(id);
        
        res.status(200).send({
            estado: true,
            mensaje: "Salón activado correctamente"
        });
    } catch (err) {
        next(err);
    }
};