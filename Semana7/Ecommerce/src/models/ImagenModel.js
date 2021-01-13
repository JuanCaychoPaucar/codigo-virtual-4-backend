const { DataTypes } = require('sequelize');

const imagen_model = (conexion) => {
    return conexion.define('imagenes', {
        imagenId: {
            primaryKey: true,
            field: 'imagen_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagenURL: {
            field: 'imagen_url',
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 't_imagen',
        timestamps: false
    })
}

module.exports = imagen_model;