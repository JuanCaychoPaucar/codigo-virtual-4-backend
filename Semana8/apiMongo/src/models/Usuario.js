const { Schema } = require('mongoose');
const direccionSchema = require('./Direccion');
const telefonoSchema = require('./Telefono');

const usuarioSchema = new Schema({
    usuario_nombre: {
        type: String,
        required: true
    },
    usuario_apellido: {
        type: String,
        required: true
    },
    usuario_email: {
        type: String,
        required: true,
        unique: true
    },
    usuario_direcciones: [
        direccionSchema
    ],
    usuario_telefonos: [
        telefonoSchema
    ]
});

module.exports = usuarioSchema;