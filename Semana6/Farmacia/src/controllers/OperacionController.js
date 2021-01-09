const { TipoOperacion, CabeceraOperacion, DetalleOperacion } = require('../config/Sequelize');
const { Op } = require('sequelize');

/**
{
    "fecha":"2021-01-15",
    "cliente":"Juan Maradona",
    "direccion":"Av Los girasoles 342",
    "total":174.20,
    "igv":31.36,
    "ruc":"10256982542",
    "tipo":"VENTA",
    "productos":[
        {
            "lote":"123",
            "cantidad":10,
            "subTotal":141.20
        },
        {
            "lote":"457",
            "cantidad":6,
            "subTotal":45.50
        },
        {
            "lote":"357",
            "cantidad":7,
            "subTotal":15.40
        }
    ]
}
 */

const crearOperacion = async (req, res) => {
    try {
        let { tipo } = req.body;
        let tipoObj = await TipoOperacion.findOne({
            where: {
                tipoOperacionDescripcion: tipo
            }
        });
        console.log(tipoObj);
    } catch (error) {

    }
    return res.send('ok');
};


const listarOperaciones = (req, res) => { };


const filtroOperaciones = (req, res) => { };


module.exports = {
    crearOperacion,
    listarOperaciones,
    filtroOperaciones
}