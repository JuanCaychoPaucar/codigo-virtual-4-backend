const { Lote, Producto, TipoOperacion, CabeceraOperacion, DetalleOperacion, conexion } = require('../config/Sequelize');
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
            "cantidad":10
        },
        {
            "lote":"457",
            "cantidad":6
        },
        {
            "lote":"357",
            "cantidad":7
        }
    ]
}
 */

/**
{
       "fecha":"2021-01-12",
       "nombre":"eduardo",
       "direccion":"calel..",
       "total":150,
       "igv":15,
       "ruc":"123123123",
       "detalle":[
           {
               "cantidad":1,
               "subtotal":15.40,
               "lote":{
                   "descripcion":"1234",
                   "fecha_vencimiento":"2021-12-31"
               }
           },
           {
               "cantidad":4,
               "subtotal":25.80,
               "lote":{
                   "descripcion":"4578",
                   "fecha_vencimiento":"2021-10-11"
               }
           }
       ]
   }
 */

const crearOperacion = async (req, res) => {
    const t = await conexion.transaction();
    try {
        let { tipo, fecha, cliente, direccion, total, igv, ruc, productos } = req.body;
        let tipoObj = await TipoOperacion.findOne({
            where: {
                tipoOperacionDescripcion: tipo
            }
        });
        // console.log(tipoObj);
        if (tipoObj == null) {
            return res.status(400).json({
                ok: false,
                content: null,
                message: 'Tipo de Venta incorrecto'
            });
        }

        let objCabecera = {
            cabeceraOperacionFecha: fecha,
            cabeceraOperacionNombre: cliente,
            cabeceraOperaciondireccion: direccion,
            cabeceraOperacionTotal: total,
            cabeceraOperacionIGV: igv,
            cabeceraOperacionRUC: ruc,
            tipo_ope_id: tipoObj.tipoOperacionId
        }

        // si quiero usar el save(), va despues de hacer un build
        // let nuevaCabecera = await CabeceraOperacion.build(objCabecera).save();
        let nuevaCabecera = await CabeceraOperacion.create(objCabecera, { transaction: t });

        // iterar los productos
        // uso del forin
        for (const key in productos) {
            // console.log(productos[key]);
            // en cada producto iterado, validar si existe el lote y si tiene la cantidad suficiente para la venta.
            // de no ser asi, indicar la falta de uno de ellos
            let lote = await Lote.findOne({
                where: {
                    loteDescripcion: productos[key].lote
                },
                include: {
                    model: Producto
                }
            });
            if (lote == null) {
                // si entra a esta condicional, significa que hubo un error en la busqueda del lote y por ende toda la transaccion de guardar cabecera y detalle ya no sirve.
                // para evitar crear informacion incoherente en la BD hacemos un rollback (retroceder en el tiempo)
                await t.rollback();
                return res.status(400).json({
                    ok: false,
                    content: null,
                    message: `Lote ${productos[key].lote} no existe`
                });
            }
            if (lote.loteCantidad < productos[key].cantidad) {
                await t.rollback();
                return res.status(400).json({
                    ok: false,
                    content: null,
                    message: `Lote ${productos[key].lote} no tiene la suficiente cantidad`
                });
            }

            // Agregar ese producto a un detalle de operacion y de acuerdo al precio del producto, agregar el subtotal al detalle de operacion
            // No olvidar adjuntar la transaccion a la creacion
            // para buscar el precio => lote.producto...
            if (lote.producto == null) {
                await t.rollback();
                return res.status(400).json({
                    ok: false,
                    content: null,
                    message: `Lote no tiene producto`
                });
            }

            let subTotal = productos[key].cantidad * lote.producto.productoPrecio;

            let objDetalleOperacion = {
                detalleOperacionCantidad: productos[key].cantidad,
                detalleOperacionSubTotal: subTotal,
                lote_id: lote.loteId,
                cab_ope_id: nuevaCabecera.cabeceraOperacionId
            }


            await DetalleOperacion.create(objDetalleOperacion, { transaction: t });

            // MODIFICAR LA CANTIDAD EN EL LOTE, PUES YA LO VENDI
            let nuevaCantidad = lote.loteCantidad - productos[key].cantidad;
            await lote.update({
                loteCantidad: nuevaCantidad
            }, { transaction: t });

        }

        // aqui si todo ha sucedido exitosamente y no hubo ningun error, todos los cambios realizados en la BD
        await t.commit();

        return res.status(201).json({
            ok: true,
            content: null,
            message: 'Se agrególa operación exitosamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'Hubo un error al crear'
        });
    }
    // return res.send('ok');
};


const listarOperaciones = async (req, res) => {
    let resultado = await CabeceraOperacion.findAll({
        attributes: [
            ['cab_ope_fech', 'fecha'],
            ['cab_ope_nomb', 'nombre'],
            ['cab_ope_direc', 'direccion'],
            ['cab_ope_total', 'total'],
            ['cab_ope_igv', 'igv'],
            ['cab_ope_ruc', 'ruc']
        ],
        include: {
            model: DetalleOperacion,
            attributes: {
                exclude: ['detalleoperacionId', 'lote_id', 'cab_ope_id']
            },
            include: {
                model: Lote,
                attributes: ['loteDescripcion', 'loteFechaVencimiento'],
                include: {
                    model: Producto,
                    attributes: [
                        ['prod_nomb', 'nombre producto'],
                        ['prod_precio', 'precio producto'],
                        ['prod_regsan', 'registro sanitario']
                    ]
                }
            }
        }
    });

    return res.json({
        ok: true,
        content: resultado,
        message: null
    });
};


const filtroOperaciones = (req, res) => { };


module.exports = {
    crearOperacion,
    listarOperaciones,
    filtroOperaciones
}