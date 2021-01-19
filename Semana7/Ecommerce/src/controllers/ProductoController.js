const { Producto, Categoria } = require('../config/Sequelize');

const createProducto = (req, res) => {
    // Al crear un nuevo producto se va a ingresar en una categoria con estado "0", indicar que "Se creó el producto, pero no se va a mostrar porque la categoria no esta activa"
    let producto;
    Producto.create(req.body)
        .then((productoCreado) => {
            producto = productoCreado;
            return Categoria.findByPk(productoCreado.categoria_id);
        })
        .then((categoriaEncontrada) => {
            if (categoriaEncontrada.categoriaEstado === false) {
                return res.status(201).json({
                    ok: true,
                    content: producto,
                    message: 'Se creó el producto, pero no se va a mostrar porque la categoria no esta activa'
                });
            } else {
                return res.status(201).json({
                    ok: true,
                    content: producto,
                    message: 'Producto creado exitosamente'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                content: error,
                message: 'Hubo un error al crear el producto'
            });
        });
}



const listarProductos = async (req, res) => {
    let productos = await Producto.findAll();

    return res.json({
        ok: true,
        content: productos,
        message: null
    });
}


const listarProductosPorCategoriaActiva = async (req, res) => {
    let productos = await Producto.findAll({
        include: {
            model: Categoria,
            where: {
                categoriaEstado: true
            },
            attributes: []
        }
    });

    return res.json({
        ok: true,
        content: productos,
        message: null
    });
}

module.exports = {
    createProducto,
    listarProductos,
    listarProductosPorCategoriaActiva
}