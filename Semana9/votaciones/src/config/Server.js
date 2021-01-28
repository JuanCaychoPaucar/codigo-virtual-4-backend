const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./Sequelize');

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
            res.header('Access-Control-Allow-Origin', '*'); // valida que el dominio este en el whitelist
            res.header('Access-Control-Allow-Header', 'Content-Type, Authorization'); // valida los headeres
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // valida los metodos que sean los auorizados
            next();
        });
    }

    // ver que contenido voy a recibir del cliente
    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }

    // configurar las rutas
    rutas() {
        this.app.get('/', (req, res) => res.json({
            ok: true,
            content: 'Bienvenido a mi API de elecciones 😎'
        }));
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto: ', this.puerto);
            conexion.sync().then(() => {
                console.log('Base de datos sincronizada correctamente 😜');
            });
        });
    }
}

module.exports = Server;