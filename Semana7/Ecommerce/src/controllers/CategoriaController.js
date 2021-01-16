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


const devolverCategorias = (req, res) => {
    Categoria.findAll().then((categorias) => {
        if (categorias.length > 0) {
            return res.status(200).json({
                ok: true,
                content: categorias,
                message: null
            });
        }
        else {
            return res.status(404).json({
                ok: false,
                content: null,
                message: 'No existen categorias, faltan crear'
            });
        }

    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al devolver las categorias'
        });
    })
}


const in_habilitarCategoria = async (req, res) => {
    // mandar el id por la url y ver si la categoria tiene su estado true, inhabilitarlo
    // si tiene estado flase, habilitarlo
    // indicar en el mensaje si fue habilitado o inhanilitado, usando operadores ternarios
    // si no existe la categoria, indicar que no existe, con un estado 404
    // use update
    // https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
    // http://127.0.0.1:5000/categoria/1

    // PROMESAS ANIDADAS
    let { id } = req.params;
    Categoria.findByPk(id)  // hacemos la busqueda por PK y nos retornara una promesa
        .then((categoriaEncontrada) => { // retorna objeto de tipo Categoria
            if (categoriaEncontrada) {
                // .update({todos_los_campos_con_su_nuevo_valor}, where:{calumna_nombre: valor})
                return Categoria.update({ categoriaEstado: !categoriaEncontrada.categoriaEstado }, {  // cambiamos el estado y lo actualizamos, usando la negacion del valor actual
                    where: {
                        categoriaId: id
                    }
                })
            } else {  // categoriaEncontrada es null
                res.status(404).json({
                    ok: false,
                    message: 'Categoria no existe'
                })
            }
        })
        .then(() => {  // volvemos a realizar la busqueda por el id
            return Categoria.findByPk(id);
        })
        .then(categoriaActualizada => {
            res.status(201).json({
                ok: true,
                content: categoriaActualizada.categoriaEstado ? 'Se habilito exitosamente' : 'Se inhabilito exitosamente',
                message: 'Categoria actualizada exitosamente'
            })
        })
        .catch(error => res.status(500).json({
            ok: false,
            content: error,
            message: 'Error al actualizar la categoria'
        }))

}



module.exports = {
    createCategoria,
    devolverCategorias,
    in_habilitarCategoria
}

// NOTA: Model Querying - Finders
// https://sequelize.org/master/manual/model-querying-finders.html