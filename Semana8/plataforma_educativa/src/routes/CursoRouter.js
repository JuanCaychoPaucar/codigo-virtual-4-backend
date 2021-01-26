const { Router } = require('express');
const curso_controller = require('../controllers/CursoController');
const curso_router = Router();

curso_router.post('/curso', curso_controller.crearCurso);
curso_router.get('/curso', curso_controller.listarCursos);
curso_router.get('/curso/:nombre', curso_controller.listarCursosPorNombre);

module.exports = curso_router;