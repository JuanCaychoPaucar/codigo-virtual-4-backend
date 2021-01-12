const { Sequelize } = require('sequelize');

const conexion = new Sequelize(
    "ecommerce_virtual4", "root", "123456", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,

    dialectOptions: {
        dateStrings: true
    }
}
);

module.exports = {
    conexion: conexion
}