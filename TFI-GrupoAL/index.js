import express from 'express';
import expressHandlebars from 'express-handlebars';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = 3000;

// Simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// HELPERS para comparar strings
const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  helpers: {
    eq: function (str1, str2, options) {
      return str1 === str2 ? options : '';
    }
  }
});

// Configuro Handlebars como motor de vistas
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Servir recursos estáticos
app.use(express.static(__dirname + '/public'));

// Rutas
app.get('/', (req, res) => res.render('inicio', { title: 'Inicio' }));

app.get('/institucional', (req, res) =>
  res.render('institucional', { title: 'Institucional' })
);

app.get('/contacto', (req, res) => {
  res.render('contacto', { title: 'Contacto' });
});

// Página personalizada de error 404
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// Página personalizada de error 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.listen(port, () =>
  console.log(`Express iniciado en http://localhost:${port}`)
);

// =======================
// Conexión a MySQL (esto deberíamos pasarlo a otra carpeta)
// =======================
async function getTodosLosSalones() {
  try {
    const conexion = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const sqlQuery = 'SELECT * FROM salones';

    const [rows] = await conexion.query(sqlQuery);

    console.log('Query results:', rows);

    await conexion.end();

  } catch (err) {
    console.error('Error executing SELECT query:', err);
  }
}

getTodosLosSalones();
