import express from 'express';
import cors from 'cors';
import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';
import { router as v1UsuariosRutas } from './v1/routes/usuariosRouter.js'; //importamos rutas de usuarios
import { router as v1ReservasRutas } from './v1/routes/reservasRouter.js';
import { router as v1ServiciosRutas } from './v1/routes/serviciosRouter.js';
import { router as v1EstadisticasRutas } from './v1/routes/estadisticasRouter.js';
import morgan from 'morgan';
import fs from 'fs';
import { router as v1TurnosRutas } from "./v1/routes/turnosRouter.js";
import { swaggerDocs } from './swagger.js';
import passport from "./middlewares/passport.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json(
  {type: 'application/json'}
));


app.get('/estado', (req, res) => {
  res.json({'ok':true})
})

app.use(passport.initialize());

let log = fs.createWriteStream('./access.log', { flags: 'a' })
app.use(morgan('dev')) // muestra en consola, lo comento porque es molesto
app.use(morgan('combined', { stream: log })) // esta es la salida del archivo, con todos los datos

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/usuarios', v1UsuariosRutas); //Rutas para usuarios
app.use('/api/v1/reservas', v1ReservasRutas);
app.use('/api/v1/servicios', v1ServiciosRutas);
app.use("/api/v1/turnos", v1TurnosRutas);
app.use("/api/v1/estadisticas", v1EstadisticasRutas);

// Activa Swagger
swaggerDocs(app);

export default app;