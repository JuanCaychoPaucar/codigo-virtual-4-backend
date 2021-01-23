const usuarioSchema = require('../models/Usuario');
const cursoSchema = require('../models/Curso');
const comentarioSchema = require('../models/Comentario');

const { model } = require('mongoose');

const Usuario = model('Usuario', usuarioSchema);
const Curso = model('Curso', cursoSchema);
const Comentario = model('Comentario', comentarioSchema);

module.exports = {
    Usuario,
    Curso,
    Comentario,
}