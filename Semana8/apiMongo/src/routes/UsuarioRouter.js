const { Router } = require('express');
const usuario_controller = require('../controllers/UsuarioController');
const usuario_router = Router();

usuario_router.post("/usuario", usuario_controller.crearUsuario);
usuario_router.get("/usuario", usuario_controller.listarUsuario);
usuario_router.put("/usuario/:id", usuario_controller.editarUsuario);
usuario_router.delete("/usuario", usuario_controller.eliminarUsuario);
usuario_router.get("/usuario/buscar/:nombre", usuario_controller.filterUsuarioPorNombre);
usuario_router.get("/usuario/buscar/correo/:email", usuario_controller.buscarPorCorreo);

module.exports = usuario_router;