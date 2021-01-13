const { DataTypes } = require('sequelize');

const producto_model = (conexion) => {
    return conexion.define('productos', {
        productoId: {
            primaryKey: true,
            field: 'producto_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productoNombre: {
            field: 'producto_nombre',
            type: DataTypes.STRING(25),
            allowNull: false
        },
        productoDescripcion: {
            field: 'producto_descripcion',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        productoMarca: {
            field: 'producto_marca',
            type: DataTypes.STRING(15),
            allowNull: false
        },
        productoPrecio: {
            field: 'producto_precio',
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            validate: {
                min: 10
            }
        },
        productoSku: {
            field: 'producto_sku',
            type: DataTypes.STRING(25),
            allowNull: false
        },
        productoDscto: {
            field: 'producto_dscto',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productoCantidad: {
            field: 'producto_cantidad',
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 't_producto',
        timestamps: false
    });
}

module.exports = producto_model;