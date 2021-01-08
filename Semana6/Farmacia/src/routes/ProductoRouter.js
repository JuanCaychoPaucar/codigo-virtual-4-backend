const ProductoController = require('../controllers/ProductoController');
const { Router } = require('express');

const producto_router = Router();
producto_router.post('/producto', ProductoController.crearProducto);
producto_router.get('/producto', ProductoController.listarProductos);
producto_router.get('/producto/:id', ProductoController.listarProductoById);
producto_router.put('/producto/:id', ProductoController.editarProductoById);
producto_router.delete('/producto/:id', ProductoController.eliminarProductoById);
producto_router.get('/producto/buscar/:nombre', ProductoController.listarProductoLikeName);

module.exports = producto_router;