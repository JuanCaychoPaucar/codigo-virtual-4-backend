const { Voto, VotoCongresal, Elector, conexion, Congresista } = require('../config/Sequelize');

const crearVoto = async (req, res) => {
    // Como me deberia mandar el front, el body
    const { voto_presidencial, voto_congresal } = req.body;
    const { elector_dni } = req.user;
    console.log("elector dni", elector_dni);

    // una transaccion sirve para cuando vayamos a realizar un conjunto de operaciones de insercion, actualizacion o eliminacion en cola,
    // y si es que alguna de ellas sale mal, las demas que ya se ejecutaron se regresaran a su estado original.
    const miTransaccion = await conexion.transaction();

    // solamente declarar la transaccion para operaciones de insercion, actualizacion o eliminacion.

    const elector = await Elector.findByPk(elector_dni);

    try {
        // creacion del voto presidencial
        await Voto.create(
            {
                partido_id: voto_presidencial,
                elector_dni: elector_dni
            },
            {
                transaction: miTransaccion
            }
        );

        // insercion del voto congresal

        let primer_congresista = await Congresista.findOne({
            where: {
                congresista_numero: voto_congresal.primer_congresista,
                partido_id: voto_congresal.partido
            }
        });

        let segundo_congresista = await Congresista.findOne({
            where: {
                congresista_numero: voto_congresal.segundo_congresista,
                partido_id: voto_congresal.partido
            }
        });

        // validar que los 2 congresistas a votar no sean los mismos, si lo son indicar que no se puede

        if (primer_congresista.congresista_numero === segundo_congresista.congresista_numero) {
            await miTransaccion.rollback();
            return res.json({
                ok: false,
                content: null,
                message: 'No esta permitido votar 2 veces por el mismo congresista'
            });
        }

        // crear el registro
        const votoCongresal = await VotoCongresal.bulkCreate(
            [
                { congresista_id: primer_congresista.congresista_id, elector_dni: elector_dni },
                { congresista_id: segundo_congresista.congresista_id, elector_dni: elector_dni }
            ],
            {
                transaction: miTransaccion
            }
        );

        await miTransaccion.commit();

        return res.json({
            ok: true,
            content: null,
            message: 'Se registraron los votos exitosamente'
        });
    } catch (error) {

        await miTransaccion.rollback();
        console.log(error);
        return res.json({
            ok: false,
            content: error,
            message: 'Hubo un error al registrar la votacion'
        });
    }
}


module.exports = {
    crearVoto
}

// {
//     voto_presidencial: id_partido,
//     voto_congresal: {
//         partido: id_partido
//         primer_congresista: congresista_numero,
//         segundo_congresista: congresista_numero
//     }
// }