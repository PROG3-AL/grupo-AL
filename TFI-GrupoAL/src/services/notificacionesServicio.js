import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesService {

    enviarCorreo = async (datosCorreo) => {  
        try {      
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, "..", "views", "pages", "plantilla.handlebars");
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

        const template = handlebars.compile(plantilla);

        // queda pendiente modificar el formato de la fecha
        // para que llegue en un formato más amigable    
        const datos = {
            fecha: datosCorreo.fecha,  
            salon: datosCorreo.salon,
            turno: datosCorreo.turno
            //correo: datosCorreo.correoElectronico
        };
        const correoHtml = template(datos);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const mailOptions = {
            // correo de destino, por ahora hardcodeado
            // después -> to: datosCorreo.correoElectronico,
            to: `maildelcliente@gmail.com`,
            // con copia para el admin, por ahora hardcodeado
            // yo (mica) lo probé con dos mails diferentes, uno para to y otro cc. funcionó ok.
            cc: `maildeladmin@hotmail.com`,
            subject: "Se creó una reserva nueva",
            html: correoHtml
        };

            const info = await transporter.sendMail(mailOptions);
            
            console.log('Correo enviado exitosamente:', info.messageId);
            console.log('Correo del destinatario:', mailOptions.to);
            
            return {
                exitoso: true,
                mensaje: "Correo enviado correctamente",
                messageId: info.messageId
            };
            
        } catch (error) {
            console.error('Error al enviar correo:', error.message);
            
            return {
                exitoso: false,
                mensaje: "Error al enviar el correo",
                error: error.message
            };
        }
    }
}
