const { Usuario } = require('../config/Sequelize');

const registrarUsuario = async (req, res) => {
    try {
        // se contruye el usuario pero no se manda a la BD
        let nuevoUsuario = Usuario.build(req.body);
        nuevoUsuario.setSaltAndHash(req.body.password);

        // aqui se manda a la BD
        nuevoUsuario.save();
        let token = nuevoUsuario.generarJWT();
        console.log(nuevoUsuario.usuarioSalt);

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

module.exports = {
    registrarUsuario,
}