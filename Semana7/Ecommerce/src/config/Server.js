const express = require('express');
const bodyParser = require('body-parser');

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
            res.header('Access-Control-Allow-Origin', '*'); // este el dominio del frontend
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
    }


    start() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor corriendo exitosamente en el puerto ${this.puerto}`);
        });
    }
}

module.exports = Server;