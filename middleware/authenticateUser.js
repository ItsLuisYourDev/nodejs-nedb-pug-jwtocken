const jwt = require('jsonwebtoken');

// Verifica si el token es válido y tiene los permisos necesarios
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        console.log("entro almenos xd")
        const decoded = jwt.verify(token, 'tu_secreto'); // Reemplaza 'tu_secreto' con tu clave secreta para firmar JWT

        // Verifica si el usuario tiene permisos
        if (!decoded.isAdmin) {
            return res.status(403).json({ success: false, message: 'Acceso no autorizado. Usuario no tiene permisos.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Token no válido.' });
    }
};

module.exports = authenticateUser;
