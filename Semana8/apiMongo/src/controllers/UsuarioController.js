const { Usuario } = require('../config/Mongoose');

const crearUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.create(req.body);
        return res.status(201).json({
            ok: true,
            content: usuario,
            message: 'Usuario creado exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el usuario'
        });
    }
};

const listarUsuario = async (req, res) => {
    let usuarios = await Usuario.find();

    return res.json({
        ok: true,
        content: usuarios,
        message: null
    });
};

const editarUsuario = async (req, res) => {
    let { id } = req.params;

    try {
        let usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, { new: true });  // new: true => para mostrar los valores del registro actualizado

        return res.status(201).json({
            ok: true,
            content: usuarioActualizado,
            message: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Error al eliminar el usuario'
        });
    }

};

const eliminarUsuario = async (req, res) => {
    let { id } = req.query;
    try {
        let resultado = await Usuario.findByIdAndDelete(id, {});
        return res.status(resultado ? 200 : 404).json({
            ok: true,
            content: resultado,
            message: resultado ? 'Usuario eliminado correctamente' : 'Usuario a eliminar no existe'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Error al eliminar el usuario'
        });
    }
};


// CONTROLADORES CON LOGICA

const filterUsuarioPorNombre = async (req, res) => {
    // https://docs.mongodb.com/manual/reference/operator/query/
    // https://docs.mongodb.com/manual/reference/operator/query/regex/#op._S_regex
    // https://mongoosejs.com/docs/models.html

    let { nombre } = req.params;
    let resultado = await Usuario.find({
        usuario_nombre: { $regex: '.*' + nombre + '.*' }   // hacer un like en mongoDB
    });

    return res.json({
        ok: true,
        content: resultado,
        message: null
    });
}


const buscarPorCorreo = async (req, res) => {
    // se solicita un controlador para buscar por correo exacto y que solamente regrese las direcciones de ese correo

    let { email } = req.params;
    let resultado = await Usuario.findOne({ usuario_email: email }, 'usuario_direcciones');

    return res.json({
        ok: true,
        content: resultado,
        message: null
    });
}



module.exports = {
    crearUsuario,
    listarUsuario,
    editarUsuario,
    eliminarUsuario,
    filterUsuarioPorNombre,
    buscarPorCorreo
}
