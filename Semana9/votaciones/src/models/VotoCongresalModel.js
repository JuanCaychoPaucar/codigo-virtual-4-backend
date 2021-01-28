const { DataTypes, Sequelize } = require("sequelize");

const voto_congresal_model = (conexion) => {
    const voto_congresal = conexion.define("votos_congresal", {
        vg_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        vg_fecha: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now')
        },
    }, {
        tableName: "t_voto_congresal",
        timestamps: false,
    });

    return voto_congresal;
};

module.exports = voto_congresal_model;