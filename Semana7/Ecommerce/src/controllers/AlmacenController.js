const { Almacen } = require('../config/Sequelize');

const createAlmacen = (req, res) => {
    /**
        Si usamos build, eso no retorna una promesa, eso retorna un objeto tipo Almacen.
        No retorna una promesa porque no hace la consulta a la BD.
        El build sirve para construir el tipo de ddato, mas no lo verifica con los datos de la BD
     */
    let objAlmacen = Almacen.build(req.body);

    /**
     * El metodo save va de la mano con el build y solo se ejecutara luego que tengamos una instancia de la clase Almacen creada,
     * y este si retornara una promesa, puesto que ya esta haciendo peticion a la BD
     */
    objAlmacen.save()
        .then((almacenCreado) => {
            return res.status(201).json({
                ok: true,
                content: almacenCreado,
                message: null
            });
        })
        .catch((error) => {
            return res.json({
                ok: false,
                content: error,
                message: 'Hubo un error al crear el almacen'
            });
        });
}


module.exports = {
    createAlmacen
}

// NOTA: Solo utilizaremos un solo .catch(), independientemente de la cantidad de .then() que tengamos