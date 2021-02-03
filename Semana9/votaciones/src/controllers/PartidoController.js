const { Partido } = require('../config/Sequelize');

const crearPartido = async (req, res) => {
    // SIN AWAIT Y SIN ASYNC. Todo trabaja dentro de la misma promesa
    // Partido.create(req.body)
    //     .then((partidoCreado) =>
    //         res.status(201).json({
    //             ok: true,
    //             content: partidoCreado,
    //             message: 'Partido creado correctamente'
    //         })
    //     )
    //     .catch((error) =>
    //         res.status(500).json({
    //             ok: false,
    //             content: error,
    //             message: 'Hubo un error al crear el partido'
    //         })
    //     );


    // CON AWAIT Y CON ASYNC
    try {
        let partidoCreado = await Partido.create(req.body);
        return res.status(201).json({
            ok: true,
            content: partidoCreado,
            message: 'Partido creado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el partido'
        });
    }
}


const listarPartidos = async (req, res) => {
    let lista = await Partido.findAll();

    return res.json({
        ok: true,
        content: lista,
        message: null
    });
}

module.exports = {
    crearPartido,
    listarPartidos
}