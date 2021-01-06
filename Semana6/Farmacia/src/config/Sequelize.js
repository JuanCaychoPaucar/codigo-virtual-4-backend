// http://sequelize.org/master/manual/getting-started.html
// npm install mysql2

const Sequelize = require('sequelize');
const productoModel = require('../models/ProductoModel');

const conexion = new Sequelize(
    // base_datos, usuario, contraseña
    "farmaciaSequelize", "root", "123456", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "-05:00",  // para que los campos de auditoria se creen con la hora local

    // opciones extras
    dialectOptions: {
        // para que al momento de mostrar fechas, las vuleva en String y no tener que hacer la conversion manual
        dateStrings: true
    }
}
);

// Aca se crean las tablas en la BD
const Producto = productoModel(conexion);


module.exports = {
    conexion
}
