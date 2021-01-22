const usuarioSchema = require('../models/Usuario');
const { model } = require('mongoose');

const Usuario = model('Usuario', usuarioSchema);

module.exports = {
    Usuario,
}