import { Router } from "express";
import EstadisticasControlador from "../../controllers/estadisticasControlador.js";
import { autenticar } from "../../middlewares/autenticacion.js";
import { autorizar, ROLES } from "../../middlewares/autorizar.js";
import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const estadisticasControlador = new EstadisticasControlador();
const router = Router();

router.get("/salones-mas-reservados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerSalonesMasReservados);

router.get("/servicios-mas-solicitados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerServiciosMasSolicitados);

router.get("/turnos-mas-reservados", autenticar, autorizar(ROLES.ADMINISTRADOR), estadisticasControlador.obtenerTurnosMasReservados);

// rutas públicas para poder renderizar los datos en el navegador
router.get("/dashboard/salones", estadisticasControlador.obtenerSalonesMasReservados);

router.get("/dashboard/servicios", estadisticasControlador.obtenerServiciosMasSolicitados);

router.get("/dashboard/turnos", estadisticasControlador.obtenerTurnosMasReservados);

router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public/dashboard.html"))
})

export { router };