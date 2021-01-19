const { Usuario, Producto, Imagen } = require('../config/Sequelize');
const producto_model = require('../models/ProductoModel');

const registrarUsuario = async (req, res) => {
    try {

        // se contruye el usuario pero no se manda a la BD
        let nuevoUsuario = Usuario.build(req.body);
        nuevoUsuario.setSaltAndHash(req.body.password);

        // aqui se manda a la BD
        nuevoUsuario.save();
        let token = nuevoUsuario.generarJWT();
        // console.log(nuevoUsuario.usuarioSalt);

        return res.status(201).json({
            ok: true,
            content: token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el usuario'
        });
    }
}


const login = async (req, res) => {
    // buscar ese usuario por su correo
    let usuario = await Usuario.findOne({
        where: { usuarioCorreo: req.body.correo }
    });

    if (usuario) {
        let resultado = usuario.validarPassword(req.body.password);
        // console.log(resultado);

        // si el resultado es true, devolver el JWT
        // si el resultado es false, devolver usuario o contraseña incorrectos
        if (resultado) {
            let token = usuario.generarJWT();
            return res.json({
                ok: true,
                content: token
            });
        }
    }
    return res.status(400).json({
        ok: false,
        content: null,
        message: 'Usuario o contraseña incorrectos'
    });

}


const devolverUsuarioPorToken = async (req, res) => {
    console.log(req.usuario);  // usuario => este parametro lo creamos en Validador
    let { usuarioId } = req.usuario;
    let usuarioEncontrado = await Usuario.findOne({
        where: {
            usuarioId: usuarioId
        },
        attributes: {
            exclude: ['usuarioHash', 'usuarioSalt', 'usuarioTipo', 'imagen_id']
        },
        include: {
            model: Imagen,
            attributes: ['imagenId']
        }
    });

    usuarioEncontrado.imagene.dataValues.imagenId = "/devolverImagen/"+usuarioEncontrado.imagene.imagenId;

    return res.json({
        ok: true,
        content: usuarioEncontrado,
        message: null
    });
}


module.exports = {
    registrarUsuario,
    login,
    devolverUsuarioPorToken
}



/**
 {
  usuarioId: 1,
  usuarioNombre: 'Juan Caycho',
  usuarioTipo: 1,
  iat: 1610814485,
  exp: 1610814545
}
 */