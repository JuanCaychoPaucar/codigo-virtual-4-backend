const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usuario_router = require('../routes/UsuarioRoutes');
const curso_router = require('../routes/CursoRouter');
const imagen_router = require('../routes/ImagenRouter');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 5000;
        this.CORS();
        this.configurarBodyParser();
        this.rutas();
        this.conectarMongoDb();
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
            content: 'La API funciona exitosamente'
        }));

        this.app.use('', usuario_router, curso_router, imagen_router); // si usamos el mismo prefijo "", podemos colocar las rutas seguidas de ,
        // this.app.use('', curso_router);
    }

    // conecto a la BD
    conectarMongoDb() {
        //mongoose.connect('mongodb://localhost:27017/plataforma_educativa', {
        //!                              username       password         cluster                    /nombre BD          ? configuraciones adicionales
        mongoose.connect('mongodb+srv://jc_caycho_p:codigovirtualbackend@cluster0.ilwxx.mongodb.net/plataforma_educativa?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => {
                console.log('Base de datos conectada exitosamente');
            })
            .catch((error) => {
                console.log(error);
            }); // la version community server no requiere usuario y contraseña
    }


    start() {
        this.app.listen(this.puerto, () => console.log('Servidor corriendo exitosamente en el puerto: ', this.puerto));
    }
}

// conexion utilizando Mongo Atlas
// mongodb+srv://jc_caycho_p:<password>@cluster0.ilwxx.mongodb.net/<dbname>?retryWrites=true&w=majority
// <password> => codigovirtualbackend
// <dbname> => plataforma_educativa