const { TipoOperacion } = require('../config/Sequelize');
const { Op } = require('sequelize');

const crearTipoOperacion = async (req, res) => {
    try {
        let nuevoTipoOperacion = await TipoOperacion.create(req.body);
        return res.status(201).json({
            ok: true,
            content: nuevoTipoOperacion,
            message: 'Se creo exitosamente el Tipo de Operacion'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el Tipo de Operacion'
        });
    }
}

const actualizarTipoOperacion = async (req, res) => {
    try {
        let resultado = await TipoOperacion.update(req.body, {
            where: {
                tipoOperacionId: {
                    [Op.eq]: req.params.id
                }
            }
        });
        return res.status(resultado == 1 ? 200 : 404).json({
            ok: true,
            content: null,
            message: resultado == 1 ? 'Se actualizó exitosamente el Tipo de Operacion' : 'No se encontro el Tipo de Operacion a actualizar'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear el Tipo de Operacion'
        });
    }
}


module.exports = {
    crearTipoOperacion,
    actualizarTipoOperacion
}