const { Router } = require('express');
const producto_controller = require('../controllers/ProductoController');
const { wachiman, validarAdminYVendedor } = require('../utils/Validador');

const producto_router = Router();

producto_router.post('/producto', validarAdminYVendedor, producto_controller.createProducto);
producto_router.get('/producto', producto_controller.listarProductos);
module.exports = producto_router;