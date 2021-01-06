// se puede usar destructuracion, para importar algo cuando queremos usar una parte de una liberia o archivo
const { Router } = require('express');
const { crearTarea, listarTareas, editarTareaPorId, eliminarTareaPorId, devolverTareaPorId } = require('../controllers/TareaController');
const tarea_router = Router();

// las rutas se deben de colocar en orden jerarquico
tarea_router.post('/tarea', crearTarea);
tarea_router.get('/tarea', listarTareas);
tarea_router.put('/tarea/:id_tarea', editarTareaPorId);
tarea_router.delete('/tarea/:id_tarea', eliminarTareaPorId);
tarea_router.get('/tarea/filter', devolverTareaPorId);

module.exports = tarea_router;