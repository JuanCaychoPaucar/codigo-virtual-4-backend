const { Voto, VotoCongresal, Partido, Congresista } = require('../config/Sequelize');
const { Sequelize } = require('sequelize');

const resultadosPresidenciales = async (req, res) => {
    // el metodo count se encarga de contar todos los registros de la tabla
    // SELECT COUNT(*) FROM T_VOTO WHERE PARTIDO_ID=2
    // console.log(await Voto.count({
    //     where: {
    //         partido_id: 2
    //     }
    // }));


    // SELECT PARTIDO_ID, COUNT(*) FROM T_VOTO GROUP BY PARTIDO_ID
    const votos = await Voto.count({
        attributes: ['partido_id'],
        group: ['partido_id']
    });

    // otra forma de hacer el conteo es usar las funciones internas de sequelize (Sequelize.fn)
    const votos2 = await Voto.findAll({
        attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('votos.partido_id')), 'numero_votos']
        ],
        group: ['votos.partido_id'],
        include: {
            model: Partido,
            as: 'partidos'
        }
    });


    // console.log(await Voto.count());

    return res.json({
        ok: true,
        content: votos,
        content2: votos2,
        message: null
    });
}


const resultadosCongresalesPaginados = async (req, res) => {
    // Devolver todos los resultados (count) de los congresistas, en el cual ademas se incluya el nombre del congresista y el nombre del partido
    // Si no vamoa a utilizar otro modelo(un include), no colocamos el alias que declaramos en el Sequelize.js, pues nos dara error al realizar la consulta
    const votos = await VotoCongresal.findAll({
        attributes: [
            //   funcion (contar),            que columna voy a contar          ,  alias para esa columna
            [Sequelize.fn('COUNT', Sequelize.col('congresistas.congresista_id')), 'numero_votos']
        ],
        group: ['congresistas.congresista_id'], //agrupacion
        include: {
            attributes: ['congresista_numero', 'congresista_nombre'],
            model: Congresista,
            as: "congresistas",
            include: {
                model: Partido,
                as: 'partidos',
                attributes: ['partido_nombre']
            }
        }
    });

    return res.json({
        ok: true,
        content: votos,
        message: null
    });
}


module.exports = {
    resultadosPresidenciales,
    resultadosCongresalesPaginados
}