const { Producto } = require('../config/Sequelize');

const createProducto = (req, res) => {
    Producto.create(req.body).then((productoCreado) => {
        return res.status(201).json({
            ok: true,
            content: productoCreado,
            message: null
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el producto'
        });
    });
}

module.exports = {
    createProducto
}