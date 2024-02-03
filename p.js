const jwt = require('jsonwebtoken');

const generateToken = (userId, isAdmin) => {
    return jwt.sign({ userId, isAdmin }, 'tu_secreto', { expiresIn: '1h' });
};

const token = generateToken('1234543534', true); // Reemplaza 'luis' con un ID de usuario numérico

if (!token) {
    console.log('Acceso no autorizado. Token no proporcionado.');
} else {
    console.log('Token generado:', token);

    try {
        const decoded = jwt.verify(token, 'tu_secreto');

        // Verifica si el usuario tiene permisos
        if (decoded.isAdmin) {
            console.log('Acceso autorizado. Usuario tiene permisos.');
        } else {
            console.log('Acceso no autorizado. Usuario no tiene permisos.');
        }
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        console.log('Acceso no autorizado. Token no válido.');
    }
}

