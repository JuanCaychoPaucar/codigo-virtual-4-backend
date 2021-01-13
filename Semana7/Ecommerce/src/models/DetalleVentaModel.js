const { DataTypes } = require('sequelize');

const detalle_venta_model = (conexion) => {
    return conexion.define('detalleVentas', {
        detalleVentaId: {
            primaryKey: true,
            field: 'detventa_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        detalleVentaCantidad: {
            field: 'detventa_cantidad',
            type: DataTypes.INTEGER,
        },
        detalleVentaPrecio: {
            field: 'detventa_precio',
            type: DataTypes.DECIMAL(6, 2),
        },
        detalleVentaTotal: {
            field: 'detventa_total',
            type: DataTypes.DECIMAL(6, 2),
        },
    }, {
        tableName: 't_detventa',
        timestamps: false
    })
}

module.exports = detalle_venta_model;