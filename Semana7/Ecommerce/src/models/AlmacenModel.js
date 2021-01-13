const { DataTypes } = require('sequelize');

const almacen_model = (conexion) => {
    // nombre en plural, json de los campos, json config de la tabla
    return conexion.define('almacenes', {
        almacenId: {
            primaryKey: true,
            field: 'almacen_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        almacenDireccion: {
            field: 'almacen_direccion',
            type: DataTypes.STRING(45)
        },
        almacenLatitud: {
            field: 'almacen_latitud',
            type: DataTypes.DECIMAL(8, 6)
        },
        almacenLongitud: {
            field: 'almacen_longitud',
            type: DataTypes.DECIMAL(8, 6)
        }
    }, {
        tableName: 't_almacen',
        timestamps: false
    });
}

module.exports = almacen_model;