// npm install express
const express = require('express');

// npm install body-parser
const bodyParser = require('body-parser');

const tareasRouter = require('../routes/TareaRoutes');

class Server {
    constructor() {
        // app es una instancia de mi clase express
        this.app = express();
        // en produccion nos asigan un puerto. En nuesta PC usaremos el puerto 5000
        this.puerto = process.env.PORT || 5000;
        this.configurarBodyParser();
        this.rutas();
    }

    // bodyparser es la forma en la cual el front me va a mandar informacion, y yo tengo que definir que tipo de informacion voy a recibir (texto planp, json, xml ...)
    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }

    // aca voy a definir todas mis rutas raices de mi aplicacion, para que cuando sean consultadas, si no estan aqui automaticamente express retornara un 404 (not found)
    rutas() {
        // primero pongo la ruta (endpoint) y luego su comportamiento (que va as hacer cuando se llame a esa ruta)
        this.app.get('/', (req, res) => {
            // toda la logica de esa ruta
            res.status(200).send('La API funciona con éxito')
        });

        this.app.use('/api', tareasRouter);

    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log('El servidor esta corriendo exitosamente en el puerto ', this.puerto);
        })
    }
}

module.exports = Server