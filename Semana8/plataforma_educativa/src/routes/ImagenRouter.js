const { Router } = require('express');
const Multer = require('multer');
const imagen_controller = require('../controllers/ImagenController');
const imagen_router = Router();

// * Se le da atributos que guarden en la memory storage. Tambien se puede limitar su tamaño definido en bytes
const multer = Multer({
    // storage: Multer.diskStorage(),
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024   //bytes*1024=kilobytes*1024=megabytes
    }
});

// multer.single('imagen') => imagen es el nombre de la llave que le vamos a pasar por el postman
imagen_router.post('/subirImagen', multer.single('imagen'), imagen_controller.subirImagen);

module.exports = imagen_router;