import express from 'express';
import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';
import expressHandlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import nodemailer from "nodemailer";
import { readFile } from "fs/promises";
import handlebars from "handlebars";

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

app.post("/notificacion", async (req, res) => {
  if (!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino) {
    return res.status(400).json({ estado: false, mensaje: "Faltan datos requeridos!" })
  }

  try {
    
    const { fecha, salon, turno, correoDestino } = req.body

    // ubicación de la plantilla
    const plantilla = join(__dirname, "views", "pages", "plantilla.handlebars")

    const archivoHbs = await readFile(plantilla, "utf-8")

    const template = handlebars.compile(archivoHbs)

    var html = template({ fecha: fecha, salon: salon, turno: turno })

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const opciones = {
      from: process.env.EMAIL_USER,
      to: correoDestino,
      subject: "Confirmación de Reserva - PROGIII TFI 2025 - Grupo AL",
      html: html,
    }

    // envío el correo electrónico
    await transporter.sendMail(opciones)
    res.json({ ok: true, mensaje: "Correo enviado correctamente." })
  } catch (error) {
    console.error("Error al enviar correo:", error)
    res.status(500).json({ ok: false, mensaje: "Error al enviar el correo.", error: error.message })
  }
})

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/salones', v1SalonesRutas);

export default app;