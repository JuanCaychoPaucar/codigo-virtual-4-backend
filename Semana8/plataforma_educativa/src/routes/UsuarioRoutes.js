const { Router } = require('express');
const { wachiman } = require('../utils/Validador');
const usuario_controller = require('../controllers/UsuarioController');
const usuario_router = Router();

usuario_router.post('/registro', usuario_controller.crearUsuario);
usuario_router.post('/login', usuario_controller.login);
usuario_router.post('/matricularUsuario/:id_curso', wachiman, usuario_controller.inscribirUsuarioCurso);
usuario_router.get('/mostrarCursos', wachiman, usuario_controller.mostrarCursosUsuario);

module.exports = usuario_router;
