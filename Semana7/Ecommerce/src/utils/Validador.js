const jwt = require('jsonwebtoken');

const verificarToken = (token) => {
    try {
        // verificar si la token recibida cumple ciertas condiciones:
        // como ver si aun tiene tiempo de vida, sila constraseña es correcta y si tiene un formato correcto
        // NOTA: la contraseña debe ser exactamente la misma conb la cual la generamos
        let password = process.env.JWT_SECRET || 'codigo4';
        let resultado = jwt.verify(token, password, { algorithm: 'RS256' });
        return resultado;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// middleware
// es un observador que si todo lo que le pasemos cumple, pasara al siguiente controlador, caso contrario, ahi terminara la consulta
// el next sirve para dar paso al siguiente controlador si es que todo fue cumplido exitosamente

// dentro de nuestro Server, debe de estar configurado en el CORS, el header Authorization
// para porbar en el postman, agregamos el header Authorization : Bearer valor_token
const wachiman = (req, res, next) => {
    console.log(req.headers);
    if (req.headers.authorization) {
        // Bearer asassa.asasa.asasas
        let token = req.headers.authorization.split(" ")[1]; // ['Bearer', 'asassa.asasa.asasas']
        let respuesta = verificarToken(token);  // me devuelve el payload
        // console.log("respuesta", respuesta);
        if (respuesta) {
            req.usuario = respuesta; // usuario => agregamos este parametro a nuestro req
            next();
        } else {
            return res.status(401).json({
                ok: false,
                content: null,
                message: 'Necesitas estar autenticado para realizar esta solicitud'
            });
        }
    } else {
        return res.status(401).json({
            ok: false,
            content: null,
            message: 'Necesitas estar autenticado para realizar esta peticion'
        });
    }
}


module.exports = {
    wachiman
}