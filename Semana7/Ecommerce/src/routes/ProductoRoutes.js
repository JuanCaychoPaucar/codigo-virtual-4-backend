const { Router } = require('express');
const producto_controller = require('../controllers/ProductoController');
const producto_router = Router();

producto_router.post('/producto', producto_controller.createProducto);

module.exports = producto_router;