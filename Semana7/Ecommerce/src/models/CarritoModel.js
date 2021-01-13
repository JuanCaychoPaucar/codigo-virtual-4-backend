const { DataTypes } = require('sequelize');

const carrito_model = (conexion) => {
    return conexion.define('carritos', {
        carritoId: {
            primaryKey: true,
            field: 'carrito_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carritoCantidad: {
            field: 'carrito_cantidad',
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 't_carrito',
        timestamps: false
    })
}

module.exports = carrito_model;