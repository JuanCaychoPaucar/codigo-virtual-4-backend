const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./Sequelize');
const producto_router = require('../routes/ProductoRouter');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.CORS();
        this.configurarBodyParser();
        this.rutas();
    }

    CORS() {
        // los CORS son el control de acceso a nuestra API si se quiere consultar desde un frontend
        this.app.use((req, res, next) => {
            // next => si todo esta correcto, puede pasar a la siguiente parte

            // Access-Control-Allow-Origin => indica que dominio o dominios pueden acceder a mi API,
            // si uso el * significa que voy a permitir que todos los dominios puedan acceder sin problemas
            // res.header('Access-Control-Allow-Origin', 'http://mipagina.com, http://miotrapagina.com');
            res.header('Access-Control-Allow-Origin', '*');

            // Access-Control-Allow-Headers => sirve para indicar que tipos de cabeceras me puede mandar el front. Si no lo declaro, sera rechazada
            // https://developer.mozilla.org/es/docs/Web/HTTP/Headers
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            // Access-Control-Allow-Methods => sirve para indicar que metodos van a poder ser consultados por el front
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

            // next()=> es para indicar que todo fue exitoso y puede continuar con la peticion correspondiente
            next();
        })
    }

    configurarBodyParser() {
        this.app.use(bodyParser.json());
    }

    rutas() {
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Bienvenido a mi API'
            });
        });
        
        this.app.use('', producto_router);
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto ', this.puerto);

            // force: true => si el force esta en true, va a borrar todas las tablas y las va a volver a crear de cero. Tendremos perdida de datos y empezara limpia desde 0

            // alter: true => veririfica que los modelos esten igual que las tablas.
            // Si hay algun cambio, solamente hara ese cambio, mas no reseteara todas las tablas y mucho menos habra perdida de informacion
            // sus valores por defecto en ambos casos son false.
            // conexion.sync({ force: true, alter: true }) la primera vez

            // http://sequelize.org/master/manual/model-basics.html#model-synchronization
            // si dejamos el sync sin ningun parametro, crea las tabla si no existen. Y no hace nada si no existe
            // recomendado dejarlo en blanco
            // conexion.sync({ force: true, alter: false })
            conexion.sync().then(() => {
                console.log('Base de datos sincronizada correctamente');
            });
        })
    }

}

// CORS => Intercambio de recursos de origen cruzado. En resumen, es un control de acceso.
// Que metodos van a poder usados (get, post, ..),
// que dominios van a poder acceder (mipagina.com)
// tipos de cabeceras van a poder ser enviadas (application/json, authorization, accept, ...)

/**
 * NOTA:
 * Debemos tener en cuenta en que puerto esta configurado nuestro backend (127.0.0.1:5000) y en que puerto esta realizando la solicitud el frontend (127.0.0.1:8000),
 * pues si los puertos son diferentes, nos mostrara el error:
 * application blocked by CORS
 */