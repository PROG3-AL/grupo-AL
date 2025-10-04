import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const conexion = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

/* export async function getTodosLosSalones() {
     let conexion;
     try {
         conexion = await mysql.createConnection({
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
       });
  
       const sqlQuery = 'SELECT * FROM salones';
  
       const [rows] = await conexion.query(sqlQuery);
  
       console.log('Query results:', rows);

       return rows;
  
     } catch (err) {

       console.error('Error executing SELECT query:', err);

     } finally {

       if (conexion) {
         await conexion.end();

       };
     }
   };
   */