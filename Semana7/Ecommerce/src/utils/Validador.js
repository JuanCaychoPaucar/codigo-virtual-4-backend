const jwt = require('jsonwebtoken');
const { Usuario } = require('../config/Sequelize');

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
};

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
                message: 'No estas autorizado para realizar esta solicitud'
            });
        }
    } else {
        return res.status(401).json({
            ok: false,
            content: null,
            message: 'Necesitas estar autenticado para realizar esta peticion'
        });
    }
};



const validacionMultiple = (tipo, authorization, res, next) => {
    // tipo =1 => validar admin
    // tipo = 2 => validar admin y vendedor
    if (authorization) {
        let token = authorization.split(" ")[1];
        let respuesta = verificarToken(token);
        switch (tipo) {
            case 1:
                console.log(respuesta);
                if (respuesta && respuesta.usuarioTipo === 1) {
                    return next();
                }
                break;
            case 2:
                if (respuesta && (respuesta.usuarioTipo === 1 || respuesta.usuarioTipo === 2)) {
                    return next();
                }
                break;
            default:
                break;
        }
        return res.status(401).json({
            ok: false,
            content: "No estas autorizado para realizar esta solicitud",
        });
    } else {
        return res.status(401).json({
            ok: false,
            message: "Necesitas estar autenticado para realizar esta peticion",
        });
    }
};



const validarAdmin = (req, res, next) => {
    return validacionMultiple(1, req.headers.authorization, res, next);
};



const validarAdminYVendedor = (req, res, next) => {
    return validacionMultiple(2, req.headers.authorization, res, next);
};



const validarCreacionPersonal = async (req, res, next) => {
    // verificamos si existe un usuario de tipo 1 (admin) en nuestra BD, para poder crear un usuario de tipo tipo 1 en caso no exista ninguno.
    // Ya que, para crear usuarios de tipo 1 y 2, se necesita tener un usuario de tipo 1 logueado.
    let usuario = await Usuario.findOne({
        where: {
            usuarioTipo: 1
        }
    });
    if (usuario) {
        let { usuarioTipo } = req.body;
        if (usuarioTipo === 1 || usuarioTipo === 2) {
            return validacionMultiple(1, req.headers.authorization, res, next);
        }
    }
    next();
};


module.exports = {
    wachiman,
    validarAdmin,
    validarAdminYVendedor,
    validarCreacionPersonal
};