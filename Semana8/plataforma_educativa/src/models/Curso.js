const { Schema } = require('mongoose');
const imagenSchema = require('./Imagen');

const cursoSchema = new Schema({
    curso_nombre: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
        maxlength: 50
    },
    curso_descripcion: {
        type: String
    },
    curso_link: String,
    curso_fecha_lanzamiento: {
        type: Date,
        min: '2021-01-01',
        max: '2021-12-31',
        default: Date.now()
    },
    curso_imagenes: [
        imagenSchema
    ],
    usuarios: [String],
    comentarios: [String]
});

module.exports = cursoSchema;