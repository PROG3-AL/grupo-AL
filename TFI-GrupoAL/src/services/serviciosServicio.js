import Servicios from "../database/servicios.js";

export default class ServiciosServicio {

    constructor () {
        this.servicios = new Servicios()
    };

    buscarServicios = () => {
        return this.servicios.buscarServicios();
    };

    buscarPorId = (id) => {
        return this.servicios.buscarPorId(id);
    };

    //Funcion extra para saber si el servicio se repite y evitar duplicados
    buscarServicioPorNombre = (descipcionServicio) => {
        return this.servicios.buscarServicioPorNombre(descipcionServicio);
    };

    desactivarServicio = (servicioId) => {
        return this.servicios.desactivarServicio(servicioId);
    };

    activarServicio = (servicioId) => {
        return this.servicios.activarServicio(servicioId);
    };

    actualizarServicio = (id, datos) => {
        return this.servicios.actualizarServicio(id, datos);
    };

    crearServicio = (nuevoServicio) => {
        return this.servicios.crearServicio(nuevoServicio);
    };


}