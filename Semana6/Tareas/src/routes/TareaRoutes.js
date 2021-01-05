// se puede usar destructuracion, para importar algo cuando queremos usar una parte de una liberia o archivo
const { Router } = require('express');
const { crearTarea, listarTareas, editarTareaPorId, eliminarTareaPorId } = require('../controllers/TareaController');
const tarea_router = Router();

tarea_router.post('/tarea', crearTarea);
tarea_router.get('/tarea', listarTareas);
tarea_router.put('/tarea/:id_tarea', editarTareaPorId);
tarea_router.delete('/tarea/:id_tarea', eliminarTareaPorId);

module.exports = tarea_router;