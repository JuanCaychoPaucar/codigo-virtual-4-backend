const { DataTypes } = require('sequelize');

const tipo_operacion_model = (conexion) => {
    let tipo_operacion = conexion.define('tipo_operaciones', {
        tipoOperacionId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            field: 'tipo_ope_id',
            allowNull: false
        },
        tipoOperacionDescripcion: {
            type: DataTypes.STRING(45),
            field: 'tipo_ope_desc',
            allowNull: false,
            unique: true,
            validate: {
                isAlpha: true
            }
        }
    }, {
        tableName: 't_tipo_ope',
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion'
        // updatedAt: false   para que no se cree dicha columna
    });

    return tipo_operacion;
}

module.exports = tipo_operacion_model;