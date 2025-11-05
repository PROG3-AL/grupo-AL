import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import UsuariosServicios from './usuariosServicio.js';

export default class NotificacionesService {

    constructor () {
        this.usuariosServicios = new UsuariosServicios();
    }

    enviarCorreo = async (datosCorreo) => {  
        try {      
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, "..", "views", "pages", "reservaCreada.handlebars");
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

        const template = handlebars.compile(plantilla);

        // Formato de fecha mas legible   
        const fechaLegible = new Date(datosCorreo.reservaExistente.fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        //Formato de hora para no incluir los segundos
        const formatearHora = (hora) => hora.split(':').slice(0, 2).join(':');

        //Buscar correo del usuario
        const usuario = await this.usuariosServicios.buscarPorId(datosCorreo.reservaExistente.usuario_id);
        const correoElectronico = usuario.nombre_usuario;

        //Buscar los correos de los administradores
        const admins = await this.usuariosServicios.buscarCorreoAdministradores();
        const correoAministradores = admins.map(correo => correo.nombre_usuario);
        const listaCorreosCC = correoAministradores.join(",");

        const datos = {
            fecha: fechaLegible,  
            salon: datosCorreo.reservaExistente.salon,
            turno: datosCorreo.reservaExistente.turno,
            hora: `${formatearHora(datosCorreo.reservaExistente.hora_desde)} - ${formatearHora(datosCorreo.reservaExistente.hora_hasta)}`,
            servicios: datosCorreo.servicios?.map(s => ({
                nombre_servicio: s.nombre_servicio
            })) ?? []
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
            // from: `Reservas <${process.env.EMAIL_USER}>`,
            from: `reservas-no-reply@grupoal.com>`,
            to: correoElectronico,
            cc: listaCorreosCC,
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
};
