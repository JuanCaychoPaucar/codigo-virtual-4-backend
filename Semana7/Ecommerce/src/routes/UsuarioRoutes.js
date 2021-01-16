const { Router } = require('express');
const usuario_controller = require('../controllers/UsuarioController');
const usuario_router = Router();

usuario_router.post('/registrar', usuario_controller.registrarUsuario);

module.exports = usuario_router;