const { Usuario } = require('../config/Mongoose');

const crearUsuario = async (req, res) => {
    try {
        // esto no crea el usuario en la base de datos, solamente construye su objeto con todos sus campos
        let objUsuario = new Usuario(req.body);
        await objUsuario.encriptarPassword(req.body.password);

        //luego que ya tengo todos mis campos seteados correctamente, tengo ahora que guardar en la BD
        let usuarioCreado = await objUsuario.save();

        let token = usuarioCreado.generarJWT();

        return res.status(201).json({
            ok: true,
            content: token,
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el usuario'
        })
    }
}


const login = async (req, res) => {
    let { correo, password } = req.body;
    let usuarioEncontrado = await Usuario.findOne({
        usuario_email: correo
    });

    if (usuarioEncontrado === null) {
        return res.status(404).json({
            ok: false,
            content: null,
            message: 'Correo o contraseña incorrectos'
        })
    }

    let validacion = await usuarioEncontrado.validarPassword(password);

    if (validacion) {
        let token = usuarioEncontrado.generarJWT();
        return res.status(200).json({
            ok: true,
            content: token,
            message: null
        })
    } else {
        return res.status(404).json({
            ok: false,
            content: null,
            message: 'Correo o contraseña incorrectos'
        })
    }

}

module.exports = {
    crearUsuario,
    login,
}