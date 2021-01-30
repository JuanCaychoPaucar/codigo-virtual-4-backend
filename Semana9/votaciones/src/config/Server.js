const express = require('express');
const bodyParser = require('body-parser');
const { conexion } = require('./Sequelize');
const partido_router = require('../routes/PartidoRouter');
const elector_router = require('../routes/ElectorRouter');
const voto_router = require('../routes/VotoRouter');

const exphbs = require('express-handlebars');

class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.CORS();
        this.configurarBodyParser();
        this.configurarHandleBars();
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

    //
    configurarHandleBars() {
        // agregp al motor express, la extension de archivos 'handlebars' con su funcionalidad de la libreria
        this.app.engine('handlebars', exphbs());
        this.app.set('view engine', 'handlebars');

        // ahora modifico los archivos staticos, osea su ubicacion en el proyecto
        this.app.use(express.static('assets'));

        // __dirname es toda la ruta raiz de mi proyecto: "c:/users/nombre/..."
        this.app.use('/assets', express.static(__dirname + '/assets'));
    }

    // configurar las rutas
    rutas() {
        this.app.get('/', (req, res) => res.json({
            ok: true,
            content: 'Bienvenido a mi API de elecciones 😎'
        }));

        this.app.use('', partido_router, elector_router, voto_router);
    }

    start() {
        this.app.listen(this.puerto, () => {
            console.log('Servidor corriendo exitosamente en el puerto: ', this.puerto);
            // sync({ force: true }) borra todas las tablas de la BD
            // sync({ alter: true }) modifica campos de la BD
            conexion.sync().then(() => {
                console.log('Base de datos sincronizada correctamente 😜');
            });
        });
    }
}

module.exports = Server;

// https://www.npmjs.com/package/express-handlebars
// npm i express-handlebars