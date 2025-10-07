import express from 'express';
import expressHandlebars from 'express-handlebars';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';

dotenv.config();

const app = express();

app.use(express.json(
  {type: 'application/json'}
));

app.use(express.urlencoded({ extended: true })); //  Parsear formularios

const port = process.env.PORT;

// Simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// HELPERS para comparar strings
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: join(__dirname, 'src', 'views', 'layouts'), // Mejorar concatenacion
  helpers: {
    eq: function (arg1, arg2) {
      return arg1 === arg2;
    }
  }
});

// Configuro Handlebars como motor de vistas
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views/pages'); // le digo a Express donde estan las vistas

// Servir recursos estáticos
app.use(express.static(__dirname + '/public'));

app.use('/api/v1/salones', v1SalonesRutas);


app.listen(port, () =>
  console.log(`Express iniciado en http://localhost:${port}`)
);

