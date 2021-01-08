const { Producto } = require('../config/Sequelize');
const { Op } = require('sequelize');    // Operators de Sequelize
// // https://sequelize.org/master/manual/model-querying-basics.html#operators

const crearProducto = async (req, res) => {
    let cuerpo = req.body;
    // toda manipulazion con sequelize, nos retorna una promesa
    // la forma mas directa de crear un registro en la BD es mediante el metodo create, en el cual se tiene que mandar un JSON con todos los campos requeridos de dicho modelo

    // hay 2 formas de trabajar promesas:
    // La primera es usando .then().catch()
    // La segunda es usando la palabra await(va a esperar el resultado de esa promesa).
    // Lo mas recomendable al usar el await, en su funcion mas proxima se debe de declarar que va a ser una funcion asincrona (async)
    try {
        let nuevoProducto = await Producto.create(cuerpo);
        console.log(nuevoProducto);
        return res.json({
            ok: true,
            content: nuevoProducto
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            content: error
        });
    }

}


const listarProductos = (req, res) => {
    // https://sequelize.org/master/manual/model-querying-finders.html
    // Si yo quiero editar el nombre con el cual esta en la BD dentro de cada atributo, le pongo un array.
    // pero, el nombre que ahora voy a reemplazar tiene que ser el nombre que esta en la BD
    // Producto.findAll({
    //     // attributes: ['productoNombre', 'productoPrecio']
    //     attributes: ['productoId', ['prod_nomb', 'Nombre'], 'productoPrecio']
    // })
    Producto.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }).then((productos) => {
        return res.json({
            ok: true,
            content: productos,
            message: null
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al devolver los productos'
        });
    });

}


const listarProductoById = (req, res) => {
    let { id } = req.params;
    Producto.findOne({
        where: {
            productoId: id,
        }
    }).then((producto) => {
        // usando operador ternario
        return producto ? res.json({
            ok: true,
            content: producto,
            message: null
        }) : res.status(404).json({
            ok: true,
            content: producto,
            message: 'No hay el producto indicado'
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al buscar el producto'
        });
    });
}


const editarProductoById = (req, res) => {
    let { id } = req.params;
    Producto.update(req.body, {
        where: {
            productoId: id
        }
    }).then(async (resultado) => { // el async se coloca en la funcion mas proxima
        if (resultado[0] !== 0) {
            let producto = await Producto.findOne({ where: { productoId: id } });
            return res.status(201).json({
                ok: true,
                content: producto,
                message: 'Registro actualizado exitosamente'
            })
        } else {
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'No se encontro producto a actualizar'
            })
        }


    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al actualizar el producto'
        });
    });
}


const eliminarProductoById = async (req, res) => {
    let { id } = req.params;
    try {
        let producto = await Producto.destroy({
            where: {
                productoId: id
            }
        });
        return producto == 1 ?
            res.json({
                ok: true,
                content: null,
                message: 'Se eliminó el producto exitosamente'
            }) : res.status(404).json({
                ok: false,
                content: null,
                message: 'No se encontro producto a eliminar'
            })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al eliminar el producto'
        });
    }

}


const listarProductoLikeName = async (req, res) => {
    let { nombre } = req.params;

    try {
        let productos = await Producto.findAll({
            where: {
                productoNombre: {
                    [Op.substring]: nombre
                }
            }
        });
        return res.json({
            ok: true,
            content: productos,
            message: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al buscar los productos'
        });
    }


}


module.exports = {
    crearProducto,
    listarProductos,
    listarProductoById,
    editarProductoById,
    eliminarProductoById,
    listarProductoLikeName
}