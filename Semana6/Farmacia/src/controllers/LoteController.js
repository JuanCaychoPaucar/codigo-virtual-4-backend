const { Lote, Producto, DetalleOperacion } = require('../config/Sequelize');
const { Op } = require('sequelize');

const crearLote = async (req, res) => {
    try {
        /**
         * build(), se tiene que hacer en 2 pasos:
         * Se contruye el objeto y esta listo para mandar a la BD (se hace las validaciones que hubiesen)
         */
        let nuevoLote = Lote.build(req.body);

        // luego usamos el metodo save() que si se encarga de almacenar en la BD,
        // y como va a tener un tiempo de respuesta retorna una promesa
        let loteCreado = await nuevoLote.save();
        return res.status(201).json({
            ok: true,
            content: loteCreado,
            message: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al guardar en la BD'
        });
    }
}

const buscarLote = async (req, res) => {
    // req.query devuelve un JSON, por ello destructuramos
    let { fecha, fech_in, fech_fin, anio } = req.query;
    // console.log(fecha);
    console.log(fech_in, fech_fin);

    try {
        let lotes
        if (fecha) {
            lotes = await Lote.findAll({
                where: {
                    loteFechaVencimiento: fecha,
                }
            });
            return res.json({
                ok: true,
                content: lotes,
                message: null
            });
        } else if (fech_in && fech_fin) {
            lotes = await Lote.findAll({
                where: {
                    loteFechaVencimiento: {
                        [Op.between]: [fech_in, fech_fin],
                    }
                }
            });
            return res.json({
                ok: true,
                content: lotes,
                message: null
            });
        }
        else if(anio){
            // Usando los Op hacer un filtro de todos los lotes segun su año
            lotes = await Lote.findAll({
                where: {
                    loteFechaVencimiento: {
                        [Op.startsWith]: [anio],
                    }
                },
                include: {
                    model: Producto,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['prod_id']
                }
            });
            return res.json({
                ok: true,
                content: lotes,
                message: null
            });

        }
        else {
            return res.json({
                ok: false,
                content: null,
                message: 'Falta el parametro de busqueda, fecha de vencimiento'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al buscar los lotes'
        });
    }
}

module.exports = {
    crearLote,
    buscarLote,
}