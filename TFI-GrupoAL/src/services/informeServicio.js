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

            const datosFormateados = (reporteConDatos || []).map(r => ({
                ...r,
                fecha_reserva: new Date(r.fecha_reserva)
                    .toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
            }));

            const csvWriter = createObjectCsvWriter({
                path: ruta,
                header: [
                    {id: 'reserva_id', title: 'Reserva id'},
                    {id: 'fecha_reserva', title: 'Fecha de reserva'},
                    {id: 'nombre', title: 'Nombre'},
                    {id: 'apellido', title: 'Apellido'},
                    {id: 'orden', title: 'Orden'},
                    {id: 'titulo', title: 'Titulo'},
                    {id: 'importe_total', title: 'Importe total'}
                ]
            });

            await csvWriter.writeRecords(datosFormateados || []);

            return ruta;

        } catch (err) {
            console.log(`Error al generar CSV ${err}`);
            throw err;
        }
    }

    informeReservaPdf = async (reporteConDatos) => {

        let browser;

        try {
            const plantillaPath = path.join(__dirname, '../views/pages/informePdf.handlebars');
            const plantillaHtml = fs.readFileSync(plantillaPath, 'utf8');

            const templado = handlebars.compile(plantillaHtml);

            const datosFormateados = (reporteConDatos || []).map(r => ({
                ...r,
                fecha_reserva: new Date(r.fecha_reserva)
                    .toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
            }));

            const htmlFinal = templado(
                {
                    reservas: datosFormateados || []
                }
            );

            browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();

            await page.setContent(htmlFinal, { waitUntil: 'networkidle0' });
            await page.emulateMediaType('screen');

            const buffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
            });

            return buffer;

        } catch (err) {
            console.error('Error al generar PDF:', err);
            throw err;
        } finally {
            if (browser) await browser.close()
        }
    }
}