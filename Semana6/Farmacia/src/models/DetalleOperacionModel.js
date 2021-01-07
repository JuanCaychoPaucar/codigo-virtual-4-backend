const { DataTypes } = require('sequelize');

const detalle_operacion_model = (conexion) => {
    let detalle_operacion = conexion.define('detalle_operaciones', {
        detalleoperacionId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            field: 'det_ope_id',
            allowNull: false
        },
        detalleOperacionCantidad: {
            type: DataTypes.INTEGER,
            field: 'det_ope_cant',
            allowNull: false
        },
        detalleOperacionSubTotal: {
            type: DataTypes.DECIMAL(5,2),
            field: 'det_ope_subtotal',
            allowNull: false
        }
    }, {
        tableName: 't_detalle_operacion',
        timestamps: false,
    });

    return detalle_operacion;
 }

 module.exports = detalle_operacion_model;