const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const categoria_router = Router();

categoria_router.post('/categoria', CategoriaController.createCategoria);
categoria_router.get('/categoria', CategoriaController.devolverCategorias);
categoria_router.put('/categoria/:id', CategoriaController.in_habilitarCategoria);


module.exports = categoria_router;