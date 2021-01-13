const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const categoria_router = Router();

categoria_router.post('/categoria', CategoriaController.createCategoria);

module.exports = categoria_router;