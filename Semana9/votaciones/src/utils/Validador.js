const jwt = require('jsonwebtoken');
const secret = process.env.JWT || 'votaciones';
const { Elector } = require('../config/Sequelize');

const verificarToken = (token) => {
    try {
        const payload = jwt.verify(token, secret, { algorithm: 'RS256' });
        return payload;
    } catch (error) {
        console.log(error);
        return error.message;
    }
}


const wachiman = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; //Bearer asas.asasa.asassasa
        const respuesta = verificarToken(token);
        if (typeof respuesta === 'object') {
            req.user = respuesta;
            next();
        } else {
            return res.status(401).json({
                ok: false,
                message: 'No estas autorizado para realizar esta solicitud'
            });
        }
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Necesitas estar atenticado para realizar esta peticion'
        });
    }
}


const renovarToken = async (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const respuesta = verificarToken(token);
        if (typeof respuesta === 'object') {
            return res.json({
                ok: true,
                message: 'La token aun es valida y no necesita renovarse'
            });
        } else if (typeof respuesta === 'string') {
            if (respuesta === 'jwt expired') {
                // mi token era valida pero ya expiro
                // el metodo decode sirve para decodificar la token.
                // Si pasamos su parametro {complete:true}, nos dara las 3 partes legibles, excepto pr la contraseña que seguiraestano enciptada

                const decoded = jwt.decode(token);
                console.log("DECODED: ", decoded);

                const nuevaToken = generarToken({ dni: decoded.elector_dni });

                return res.json({
                    ok: true,
                    content: nuevaToken
                });

            } else {
                // la contraseña es incorrecta o la token es invalida.
                return res.json({
                    ok: false,
                    message: 'Token incorrecta'
                });
            }
        }

    } else {
        return res.status(401).json({
            ok: false,
            message: 'Se necesita una token'
        });
    }
}



const generarToken = ({ dni, tipo }) => { // destructuracion de todo mi elector en mi zona de parametro
    const payload = {
        elector_dni: dni,
        elector_tipo: tipo
    }
    const token = jwt.sign(payload, secret, { expiresIn: 60 }, { algorithm: 'RS256' }); // 60 segundos

    return token;
}


const validarAdmin = async (req, res, next) => {
    const electorEncontrado = await Elector.findByPk(req.user.elector_dni);
    if (electorEncontrado.elector_tipo === 1) { // tipo 1 es admin
        next();
    } else {
        return res.json({
            ok: false,
            content: null,
            message: 'usuario no cuenta con los privilegios suficientes para esta solicitud'
        });
    }
}



module.exports = {
    generarToken,
    verificarToken,
    renovarToken,
    wachiman,
    validarAdmin
}

// npm i jsonwebtoken