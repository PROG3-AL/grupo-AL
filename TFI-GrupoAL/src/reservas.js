import express from 'express';
import cors from 'cors';
import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';
import { router as v1UsuariosRutas } from './v1/routes/usuariosRouter.js';
import { router as v1ReservasRutas } from './v1/routes/reservasRouter.js';
import { router as v1ServiciosRutas } from './v1/routes/serviciosRouter.js';
import { router as v1EstadisticasRutas } from './v1/routes/estadisticasRouter.js';
import morgan from 'morgan';
import fs from 'fs';
import { router as v1TurnosRutas } from "./v1/routes/turnosRouter.js";
import { swaggerDocs } from './swagger.js';
import passport from "./middlewares/passport.js";

const app = express();

app.use(cors());

app.use(express.json(
  {type: 'application/json'}
));

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

app.use(passport.initialize());


app.get('/estado', (req, res) => {
  res.json({'ok':true})
})

let log = fs.createWriteStream('./access.log', { flags: 'a' })
app.use(morgan('dev')) 
app.use(morgan('combined', { stream: log })) 



app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/usuarios', v1UsuariosRutas); 
app.use('/api/v1/reservas', v1ReservasRutas);
app.use('/api/v1/servicios', v1ServiciosRutas);
app.use("/api/v1/turnos", v1TurnosRutas);
app.use("/api/v1/estadisticas", v1EstadisticasRutas);

swaggerDocs(app);

export default app;