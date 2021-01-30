const { Router } = require('express');

const voto_controller = require('../controllers/VotoController');
const { wachiman } = require('../utils/Validador');
const voto_router = new Router();

voto_router.post("/voto", wachiman, voto_controller.crearVoto);

module.exports = voto_router;