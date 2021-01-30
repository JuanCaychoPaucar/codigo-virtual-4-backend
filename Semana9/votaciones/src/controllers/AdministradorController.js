const { Voto, VotoCongresal } = require('../config/Sequelize');

const resultadosPresidenciales = async (req, res) => {
    // el metodo count se encarga de contar todos los registros de la tabla
    // SELECT COUNT(*) FROM T_VOTO WHERE PARTIDO_ID=2
    console.log(await Voto.count({
        where: {
            partido_id: 2
        }
    }));


    // SELECT PARTIDO_ID, COUNT(*) FROM T_VOTO GROUP BY PARTIDO_ID
    const votos = await Voto.count({
        attributes: ['partido_id'],
        group: 'partido_id'
    });


    console.log(await Voto.count());

    return res.json({
        ok: true,
        content: votos,
        message: null
    });
}


const resultadosCongresalesPaginados = (req, res) => { }


module.exports = {
    resultadosPresidenciales,
    resultadosCongresalesPaginados
}