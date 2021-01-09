const OperacionController = require('../controllers/OperacionController');
const { Router } = require('express');

const operacion_router = Router();
operacion_router.post('/operacion', OperacionController.crearOperacion);
operacion_router.get('/operaciones', OperacionController.listarOperaciones);
operacion_router.get('/operaciones/buscar', OperacionController.filtroOperaciones);

module.exports = operacion_router;