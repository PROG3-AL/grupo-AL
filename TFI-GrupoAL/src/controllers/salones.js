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

// Actualizar Salon 
export async function actualizarSalon(req, res, next) {
    if (!req.params.id || !req.body) {
        return res.status(400).send({ Estado: false, mensaje: "Faltan datos requeridos" });
    }

    try {
        const { id } = req.params;
        const actualizado = await salonesBD.actualizarSalon(id, req.body);

        if (!actualizado) {
            return res.status(404).send({Estado: false,mensaje: "No se encontró el salón para actualizar"});
        }

        res.send({Estado: true,mensaje: "Salón actualizado correctamente"});
    } catch (err) {
        next(err);
    }
};