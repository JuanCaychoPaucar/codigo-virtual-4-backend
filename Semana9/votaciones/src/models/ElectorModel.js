const { DataTypes } = require('sequelize');

const elector_model = (conexion) => {
    const elector = conexion.define("electores", {
        elector_dni: {
            type: DataTypes.STRING(8),
            primaryKey: true,
            allowNull: false
        },
        elector_email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        elector_nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        elector_apellido: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        elector_habilitado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        elector_hash: DataTypes.TEXT,
        elector_tipo: {
            type: DataTypes.INTEGER,
            defaultValue: 2
        }
    }, {
        tableName: 't_elector',
        timestamps: false
    });

    return elector;
};

module.exports = elector_model;