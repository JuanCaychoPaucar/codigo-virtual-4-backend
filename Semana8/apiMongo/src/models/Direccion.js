const { Schema } = require('mongoose');

const direccionSchema = new Schema({
    tipo_direccion: {
        type: String, // ! es el unico campo obligatorio al definir una columna
        uppercase: true, // todo el texto ingresado se convierte en mayuscula
        maxlength: 50  // longitud maxima, lo convertiria como un VARCHAR
    },
    direccion_descripcion: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 60
    }
},
    { _id: false }
);  // con _id:false => no crea el id en la tabla

module.exports = direccionSchema;