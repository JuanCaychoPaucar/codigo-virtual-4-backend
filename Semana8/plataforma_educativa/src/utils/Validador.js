const jwt = require('jsonwebtoken');
const { Usuario } = require('../config/Mongoose');

const verificarToken = (token) => {
    try {
        let password = process.env.JWT_SECRET || 'mongoAPI';
        let payload = jwt.verify(token, password, { algorithm: 'RS256' });
        return payload;

    } catch (error) {
        console.log(error);
        return null;
    }
}



const wachiman = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; //Bearer 1236.dssdsdf.hghgh5
        const respuesta = verificarToken(token);
        if (respuesta) {
            // agrego a mi request un nuevo campo llamado usuario, en el cual voy a almacenar todo su payload
            req.usuario = respuesta;
            next();
        } else {
            // la token no es valida o ya murio o la password no es la correcta
            return res.status(401).json({
                ok: false,
                content: null,
                message: 'No estas autorizado para realizar esta peticion'
            });
        }
    } else {
        return res.status(401).json({
            ok: false,
            content: null,
            message: 'necesitas estar autenticado para realizar esta peticion'
        });
    }
}


module.exports = {
    wachiman
}