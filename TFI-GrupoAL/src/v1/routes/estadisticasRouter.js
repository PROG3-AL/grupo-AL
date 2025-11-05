import { Router } from "express";
import EstadisticasControlador from "../../controllers/estadisticasControlador.js";
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";

const estadisticasControlador = new EstadisticasControlador();
const router = Router();

router.get("/salones-mas-reservados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerSalonesMasReservados
);

router.get("/servicios-mas-solicitados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerServiciosMasSolicitados
);

router.get("/turnos-mas-reservados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerTurnosMasReservados
);

export { router };