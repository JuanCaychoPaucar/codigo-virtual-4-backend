const { Schema } = require('mongoose');
const imagenSchema = require('./Imagen');

// npm i moment-timezone
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

// instalar
// npm i @google-cloud/storage

const moment = require("moment-timezone");
const horaPeruana = moment.tz(new Date, 'America/Lima');

// TODO
// * Agregar el contenido del curso
// * Agregar el costo del curso

// Schema interno
const contenidoSchema = new Schema({
    video_url: {
        type: String,
        required: true
    },
    video_orden: {
        type: Number,
        required: true
    },
    video_nombre: {
        type: String,
        maxlength: 100
    }
}, { _id: false });


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
        default: horaPeruana
    },
    curso_imagenes: [
        imagenSchema
    ],
    usuarios: [Schema.Types.ObjectId],
    comentarios: [Schema.Types.ObjectId],
    curso_videos: {
        type: [contenidoSchema],
        required: true
    },
    curso_costo: {
        type: Number,
        min: 0
    },
    curso_duracion: String,
    curso_publicado: {
        type: Boolean,
        default: false
    }
});

module.exports = cursoSchema;