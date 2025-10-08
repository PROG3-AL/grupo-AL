import Salones from '../database/salones.js';

export default class SalonesServicio {
    constructor () {
        this.salones = new Salones()
    };

    buscarSalones = () => {
        return this.salones.buscarSalones();
    };

    buscarPorId = (id) => {
        return this.salones.buscarPorId(id); 
    };

    desactivarSalon = (id) => {
        return this.salones.desactivarSalon(id); 
    };

    activarSalon = (id) => {
        return this.salones.activarSalon(id); 
    };

    actualizarSalon = (id, datos) => {
        return this.salones.actualizarSalon(id, datos); 
    };

    crearSalon = (salon) => {
        return this.salones.crearSalon(salon); 
    };
};