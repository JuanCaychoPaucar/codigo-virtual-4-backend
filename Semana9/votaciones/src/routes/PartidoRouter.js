const { Router } = require('express');

const partido_controller = require('../controllers/PartidoController');
const partido_router = new Router();

partido_router.post("/partido", partido_controller.crearPartido);

module.exports = partido_router;