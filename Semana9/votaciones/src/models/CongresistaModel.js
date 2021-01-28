const { DataTypes } = require("sequelize");

const congresista_model = (conexion) => {
    const congresista = conexion.define("congresistas", {
        congresista_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        congresista_numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        congresista_nombre: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
    }, {
        tableName: "t_congresista",
        timestamps: false
    });

    return congresista;
};

module.exports = congresista_model;