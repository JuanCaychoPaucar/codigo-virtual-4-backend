// Schema, son las colecciones (tablas)
const { Schema } = require('mongoose');

// creamos un schema interno, el cual almacenara los telefonos que pueda tener un usuario
// un usuario puede tener muchos telefonos
const fonoUsuarioSchema = new Schema({
    fono_codigo: {
        type: Number,
        min: 1,
        max: 99
    },
    fono_numero: {
        type: String,
        minlength: 6,
        maxlength: 9
    }
}, { _id: false });  // _id:false, solo debemos de utilizarlos en sub Schemas



// en BD no relacionales, las tablas pasan a llamarse colecciones y dentro de mongoose se denomina Schema
const usuarioSchema = new Schema({
    usuario_nombre: {
        type: String,
        required: true,
        alias: 'usu_nomb'
    },
    usuario_apellido: {
        type: String,
        maxlength: 25
    },
    usuario_email: {
        type: String,
        maxlength: 50,
        required: true
    },
    usuario_hash: String,
    usuario_salt: String,
    usuario_categoria: Number,
    usuario_telefono: [
        fonoUsuarioSchema
    ]
});



module.exports = usuarioSchema;


/**
 * TIPOS DE DATOS:
 * String, Number, date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
 */