const { DataTypes } = require('sequelize');

const lote_model = (conexion) => {
    let lote = conexion.define('lotes', {
        loteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'lote_id',
            autoIncrement: true,
            allowNull: false
        },
        loteDescripcion: {
            type: DataTypes.STRING(15),
            unique: true,
            field: 'lote_desc'
        },
        loteCantidad: {
            type: DataTypes.INTEGER,
            field: 'lote_cantidad'
        },
        loteFechaVencimiento: {
            type: DataTypes.DATEONLY,
            field: 'lote_fecvenc',
            allowNull: false,
            defaultValue: "2021-12-31",
            validate: {
                isAfter: "2021-01-01",
                isBefore: "2025-12-31"
            }
        }
    }, {
        tableName: 't_lote'
    });

    return lote;
}

module.exports = lote_model;