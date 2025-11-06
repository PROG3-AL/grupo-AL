import jwt from 'jsonwebtoken';

const CLAVE = process.env.CLAVE_JWT

export const generarToken = (usuario) => {
    const payload = {
        id: usuario.usuario_id,
        nombre_usuario: usuario.nombre_usuario,
        tipo_usuario: usuario.tipo_usuario
    };
    return jwt.sign(payload, CLAVE, { expiresIn: '1h' });
}

export const verificarToken = (token) => {
    try {
        return jwt.verify(token, CLAVE);
    } catch (err) {
        return null;
    }
}