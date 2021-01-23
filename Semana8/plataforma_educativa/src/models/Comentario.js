const { Schema } = require('mongoose');

const comentarioSchema = new Schema({
    comentario: {
        type: String,
        maxlength: 100,
        required: true
    },
    usuario: {
        type: String,
        trim: true,
        required: true
    },
    curso: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = comentarioSchema;