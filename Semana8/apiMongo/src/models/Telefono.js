const { Schema } = require('mongoose');

const telefonoSchema = new Schema({
    tipo_telefono: {
        type: String,
        maxlength: 20,
        uppercase: true,
        required: true,
        trim: true  // remueve espacios iniciales y finales antes de registrarlos
    },
    descripcion_telefono: {
        type: String,
        minlength: 6,
        maxlength: 10,
        required: true
    }
},
    { _id: false }
);  // con _id:false => no crea el id en la tabla

module.exports = telefonoSchema;