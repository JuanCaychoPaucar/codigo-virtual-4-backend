const TipoOperacionController = require('../controllers/TipoOperacionController');
const { Router } = require('express');

const tipo_operacion_router = Router();
tipo_operacion_router.post('/tipo_ope', TipoOperacionController.crearTipoOperacion);
tipo_operacion_router.put('/tipo_ope/:id', TipoOperacionController.actualizarTipoOperacion);

module.exports = tipo_operacion_router;