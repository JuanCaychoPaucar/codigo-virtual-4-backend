const { DataTypes } = require('sequelize');

const cabecera_venta_model = (conexion) => {
    return conexion.define('cabeceraVentas', {
        cabeceraVentaId: {
            primaryKey: true,
            field: 'cabventa_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cabeceraVentaFecha: {
            field: 'cabventa_fecha',
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        cabeceraVentaTotal: {
            field: 'cabventa_total',
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        cabeceraVentaIGV: {
            field: 'cabventa_igv',
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
    }, {
        tableName: 't_cabventa',
        timestamps: false
    })
}

module.exports = cabecera_venta_model;