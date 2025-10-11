import app from './reservas.js';

process.loadEnvFile(); 

const port = process.env.PORT;

app.listen(port, () =>
   console.log(`Express iniciado en http://localhost:${port}`)
);


