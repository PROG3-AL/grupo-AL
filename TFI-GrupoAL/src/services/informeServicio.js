import { createObjectCsvWriter } from 'csv-writer';
import puppeteer, { Browser } from 'puppeteer';
import handlebars from 'handlebars';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {

    informeReservaCsv = async (reporteConDatos) => {
        try {
            let ruta = path.resolve(__dirname, '../utils');
            ruta = path.join(ruta, 'reservas.csv');

            const csvWriter = createObjectCsvWriter({
                path: ruta,
                header: [
                    {id: 'reserva_id', title: 'Reserva id'}
                    // {id: 'fecha_reserva', title: 'Fecha reserva'},
                    // {id: 'titulo', title: 'Titulo'},
                    // {id: 'orden', title: 'Orden'}
                ]
            });

            await csvWriter.writeRecords(reporteConDatos);

            return ruta;

        } catch (err) {
            console.log(`Error al generar CSV ${err}`);
        }
    }

    informeReservaPdf = async (reporteConDatos) => {
        try {
            const plantillaPath = path.join(__dirname, '../utils/handlebars/informe.hbs');
            const plantillaHtml = fs.readFileSync(plantillaPath, 'utf8');

            const templado = handlebars.compile(plantillaHtml);

            const htmlFinal = templado(
                {
                    reservas: reporteConDatos
                }
            );

        } catch (err) {

        }
    }
}