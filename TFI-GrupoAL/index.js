import express from 'express';
import expressHandlebars from 'express-handlebars';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// import { getTodosLosSalones } from './database/conexion.js';
import salonesRouter from './src/routes/salonesRouter.js';

dotenv.config();

const app = express();

app.use(express.json(
  {type: 'application/json'}
));

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

// Rutas
// app.get('/', (req, res) => res.render('inicio', { title: 'Inicio' }));

// app.get('/institucional', (req, res) =>
//   res.render('institucional', { title: 'Institucional' })
// );

// app.get('/contacto', (req, res) => {
//   res.render('contacto', { title: 'Contacto' });
// });

app.use('/salones', salonesRouter);

// Página personalizada de error 404
// app.use((req, res) => {
//   res.status(404);
//   res.render('404');
// });

// Página personalizada de error 500
// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.status(500);
//   res.render('500');
// });

app.listen(port, () =>
  console.log(`Express iniciado en http://localhost:${port}`)
);

// // /* // =======================
// // // EJECUCION MANUAL DE getTodosLosSalones
// // // =======================

// async function testDatabase() {
//   try {
//     const salones = await getTodosLosSalones();
//     console.log('✅ Conexión a MySQL exitosa');
//     console.log('📊 Salones encontrados:', salones.length);
//   } catch (error) {
//     console.error('❌ Error de MySQL:', error.message);
//   }
// }

// testDatabase();  // Descomentar para probar