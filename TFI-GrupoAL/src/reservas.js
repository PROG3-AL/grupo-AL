import express from 'express';
import { router as v1SalonesRutas } from './v1/routes/salonesRouter.js';
/* import expressHandlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; */
//

const app = express();

app.use(express.json(
  {type: 'application/json'}
));


app.use('/api/v1/salones', v1SalonesRutas);

export default app;


/* app.use(express.urlencoded({ extended: true })); //  Parsear formularios


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
 */

