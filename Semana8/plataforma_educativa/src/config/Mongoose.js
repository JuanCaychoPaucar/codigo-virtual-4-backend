const usuarioSchema = require('../models/Usuario');
const cursoSchema = require('../models/Curso');

const { model } = require('mongoose');

const Usuario = model('usuario', usuarioSchema);
const Curso = model('curso', cursoSchema);

module.exports = {
    Usuario,
    Curso
}