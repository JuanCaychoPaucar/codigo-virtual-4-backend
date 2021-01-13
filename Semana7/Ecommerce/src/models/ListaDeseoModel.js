const { DataTypes } = require('sequelize');

const lista_deseo_model = (conexion) => {
    return conexion.define('listaDeseos', {
        listaDeseoId: {
            primaryKey: true,
            field: 'lista_deseo_id',
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 't_lista_deseo',
        timestamps: false
    })
}

module.exports = lista_deseo_model;