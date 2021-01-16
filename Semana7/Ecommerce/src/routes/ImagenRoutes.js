const { Router } = require('express');

const imagen_controller = require('../controllers/ImagenController');
const imagen_router = Router();
const multiparty = require('connect-multiparty');

// indica en que ubicacion se subira el archivo, debemos de crear antes dicha carpeta
const multipartyMiddleware = multiparty({
    uploadDir: './src/multimedia',
    maxFilesSize: 5 * 1024 * 1024  // expresion declarada en bytes.  Actual es 5 Mb para el ejemplo
});




imagen_router.post('/subirImagen', multipartyMiddleware, imagen_controller.subirImagen);
imagen_router.get('/devolverImagen/:id', imagen_controller.devolverImagenPorId);
imagen_router.put('/actualizarImagen/:id', multipartyMiddleware, imagen_controller.actualizarImagen);

module.exports = imagen_router;

// https://github.com/expressjs/connect-multiparty/blob/master/test/multipart.js
// https://www.npmjs.com/package/multiparty