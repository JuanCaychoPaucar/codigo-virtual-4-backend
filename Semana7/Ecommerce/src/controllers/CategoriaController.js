const { Categoria } = require('../config/Sequelize');

// creacion de categoria
const createCategoria = async (req, res) => {
    try {
        // si quiero usar el save, primero tengo que construir (build)
        let nuevaCategoria = await Categoria.create(req.body);
        return res.status(201).json({
            ok: true,
            content: nuevaCategoria,
            message: 'Categoria creada exitosamente'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear la categoria'
        })
    }
}

module.exports = {
    createCategoria
}