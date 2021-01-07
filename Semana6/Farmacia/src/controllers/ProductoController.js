const { Producto } = require('../config/Sequelize');

const crearProducto = (req, res) => {
    return res.satus(201).json({
        ok: true
    });
}

module.exports = {
    crearProducto
}