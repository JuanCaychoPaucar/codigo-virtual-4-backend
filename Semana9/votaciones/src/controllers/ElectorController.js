const { Elector } = require('../config/Sequelize');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { generarToken } = require('../utils/Validador')

const clienteCorreo = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // secure va a ser true cuando el puerto sea el 465
    auth: {
        user: 'proyecto.tienda.online.UTP@gmail.com',
        pass: 'UTP1635170'
    },
    tls: {
        rejectUnauthorized: false
    }
})

const crearElector = async (req, res) => {

    try {
        const { elector_dni, elector_email, elector_tipo } = req.body;

        // validar si el DNI ya esta registrado
        let busquedaElectorDNI = await Elector.findOne({
            where: {
                elector_dni: elector_dni
            }
        });

        if (busquedaElectorDNI) {
            if (busquedaElectorDNI.elector_email === elector_email) {
                return res.status(500).json({
                    ok: false,
                    content: null,
                    message: 'El DNI y el email ya se encuentran registrados'
                });
            }
            return res.status(500).json({
                ok: false,
                content: null,
                message: 'El DNI  ya se encuentra registrado'
            });
        }

        // validar si el email ya esta registrado
        let busquedaElectorEmail = await Elector.findOne({
            where: {
                elector_email: elector_email
            }
        });

        if (busquedaElectorEmail) {
            return res.status(500).json({
                ok: false,
                content: null,
                message: 'El email ya se encuentra registrado'
            });
        }


        // APIPERU RENIEC
        // https://docs.apiperu.dev/

        let respuesta = await fetch(`https://apiperu.dev/api/dni/${elector_dni}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 985a6c5f7b0529d6efb0968fabe0fd6ffe81136bb67cc0c4fff937fdbf02880d'
            }
        });

        const informacion = await respuesta.json();

        const salt = bcrypt.genSaltSync(10);

        await Elector.create({
            elector_dni: elector_dni,
            elector_email: elector_email,
            elector_tipo: elector_tipo,
            elector_nombre: informacion.data.nombres,
            elector_apellido: informacion.data.apellido_paterno + ' ' + informacion.data.apellido_materno,
            elector_hash: salt
        });


        // envio de correo
        let respuestaCorreo = await clienteCorreo.sendMail({
            to: elector_email,
            subject: 'Activa tu cuenta para las elecciones! ✔ 💯',
            text: `Por favor haga click en el siguiente enlace para activar su cuenta: ${req.get('host')}/activarCuenta?id=assdasdasdas`,
            html: `Hola <b>${informacion.data.nombres}</b> por favor has click en el siguiente enlace para que puedas realizar la votacion
            <a href="${req.get('host')}/activarCuenta?id=${salt}">ACTIVAR MI CUENTA</a>
            `
        });
        // fin envio de correo


        return res.status(201).json({
            ok: true,
            content: respuestaCorreo,
            message: 'Se envio el correo al elector, verifique su bandeja de entrada o spam'
        });

    } catch (error) {
        console.log("ERROR", error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al registrar el Elector'
        });
    }
}


const activarElector = async (req, res) => {
    console.log("activar elector: ", req.query);

    const { id } = req.query;
    const elector = await Elector.findOne({
        where: {
            elector_hash: id
        }
    });

    console.log("elector : ", elector);

    if (elector) {
        if (elector.elector_habilitado === false) {
            elector.elector_habilitado = true;
            elector.save();
            return res.render('inicio', { nombre: elector.elector_nombre, apellido: elector.elector_apellido });   // nombre de la vista, parametros

        } else {
            return res.render('error');
        }

    } else {
        return res.render('no_encontrado');
    }

}


const iniciarSesion = async (req, res) => {
    let { dni, correo } = req.body;
    // hacer la busqueda del elector, segun su correo y dni
    let elector = await Elector.findOne({
        where: {
            elector_dni: dni,
            elector_email: correo,
            elector_habilitado: true
        }
    });

    console.log("ELECTOR", elector);

    if (elector) {
        const token = generarToken({ dni: elector.elector_dni, tipo: elector.elector_tipo });
        return res.json({
            ok: true,
            content: token,
            message: null
        });
    } else {
        return res.status(401).json({
            ok: false,
            content: null,
            message: 'Elector no registrado o no habilitado. Revise su correo'
        });
    }

}



module.exports = {
    crearElector,
    activarElector,
    iniciarSesion
}

// https://www.npmjs.com/package/node-fetch
// npm i node-fetch

// https://www.npmjs.com/package/bcrypt
// npm i bcrypt

// https://www.npmjs.com/package/nodemailer
// npm i nodemailer

// handlebars
// https://handlebarsjs.com/guide/#what-is-handlebars


// BODY
/**
     * {
     *    elector_dni: 12345678,
     *    elector_email: 'email@mail.com,
     *    elector_tipo: 2
     * }
*/



/**
 * Lo que devuelve la consulta del DNI
json :  {
  success: true,
  data: {
    origen: 3,
    numero: '12345678',
    nombre_completo: 'CAYCHO PAUCAR, JUAN CARLOS',
    nombres: 'JUAN CARLOS',
    apellido_paterno: 'CAYCHO',
    apellido_materno: 'PAUCAR',
    codigo_verificacion: 0,
    fecha_nacimiento: null,
    sexo: null
  }
}
 */