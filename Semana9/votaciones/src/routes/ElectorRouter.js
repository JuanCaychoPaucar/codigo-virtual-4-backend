const { Router } = require('express');

const elector_controller = require('../controllers/ElectorController');
const elector_router = new Router();

const { renovarToken } = require('../utils/Validador')

elector_router.post("/registrar", elector_controller.crearElector);
elector_router.get("/activarCuenta", elector_controller.activarElector);
elector_router.post("/iniciarSesion", elector_controller.iniciarSesion);
elector_router.post("/renovarToken", renovarToken);

module.exports = elector_router;