const { Router } = require('express');
const usuario_controller = require('../controllers/UsuarioController');
const usuario_router = Router();

usuario_router.post('/registro', usuario_controller.crearUsuario);
usuario_router.post('/login', usuario_controller.login);

module.exports = usuario_router;
