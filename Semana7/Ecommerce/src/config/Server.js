const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./Sequelize');
const categoria_router = require('../routes/CategoriaRoutes');
const almacen_router = require('../routes/AlmacenRoutes');
const producto_router = require('../routes/ProductoRoutes');
const imagen_router = require('../routes/ImagenRoutes');
const usuario_router = require('../routes/UsuarioRoutes');
const venta_router = require('../routes/VentaRoutes');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.CORS();
        this.configurarBodyParser();
        this.rutas();
    }

    CORS() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // este es el dominio del frontend
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            next();
        });
    }

    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }

    rutas() {
        this.app.get('/', (req, res) => {
            res.status(200).send('la API funciona correctamente 😎🍕');
        });
        this.app.use('', categoria_router);
        this.app.use('', almacen_router);
        this.app.use('', producto_router);
        this.app.use('', imagen_router);
        this.app.use('', usuario_router);
        this.app.use('', venta_router);
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`);
            // sync({ force: true })
            // sync({ alter: true })
            conexion.sync().then(() => {
                console.log('Base de datos sincronizada exitosamente');
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}

module.exports = Server;