import express from 'express';
import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';
import { router as v1UsuariosRutas } from './v1/routes/usuariosRouter.js'; //importamos rutas de usuarios
import { router as v1ReservasRutas } from './v1/routes/reservasRouter.js';
import { router as v1ServiciosRutas } from './v1/routes/serviciosRouter.js';
import expressHandlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import nodemailer from "nodemailer";
import { readFile } from "fs/promises";
import handlebars from "handlebars";
import morgan from 'morgan';
import fs from 'fs';
import { router as v1TurnosRutas } from "./v1/routes/turnosRouter.js";

const app = express();

app.use(express.json(
  {type: 'application/json'}
));

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const hbs = expressHandlebars.create({
  defaultLayout: "main",
  layoutsDir: join(__dirname, "views", "layouts"),
  helpers: {
    eq: (arg1, arg2) => arg1 === arg2,
  },
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", join(__dirname, "views", "pages"))

app.use(express.static(join(__dirname, "..", "public")))

app.get('/estado', (req, res) => {
  res.json({'ok':true})
})

let log = fs.createWriteStream('./access.log', { flags: 'a' })
//app.use(morgan('dev')) // muestra en consola, lo comento porque es molesto
app.use(morgan('combined', { stream: log })) // esta es la salida del archivo, con todos los datos

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/salones', v1SalonesRutas);
app.use('/api/v1/usuarios', v1UsuariosRutas); //Rutas para usuarios
app.use('/api/v1/reservas', v1ReservasRutas);
app.use('/api/v1/servicios', v1ServiciosRutas);
app.use("/api/v1/turnos", v1TurnosRutas);

export default app;