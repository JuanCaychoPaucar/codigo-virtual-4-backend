const { Router } = require('express');

const administrador_controller = require('../controllers/AdministradorController');
const { wachiman, validarAdmin } = require('../utils/Validador');
const administrador_router = new Router();

administrador_router.get("/presidenciales", wachiman, validarAdmin, administrador_controller.resultadosPresidenciales);

module.exports = administrador_router;