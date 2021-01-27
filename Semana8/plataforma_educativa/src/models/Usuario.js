// Schema, son las colecciones (tablas)
const { Schema } = require('mongoose');
const imagenSchema = require('./Imagen');
const bcrypt = require('bcrypt');  // npm i bcrypt
const { sign } = require('jsonwebtoken');

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
        required: true,
        unique: true
    },
    usuario_hash: String,
    usuario_categoria: {
        type: Number,
        min: 1,
        max: 4
    },
    usuario_telefono: [
        fonoUsuarioSchema
    ],
    usuario_imagen: imagenSchema,
    cursos: [Schema.Types.ObjectId],
    comentarios: [Schema.Types.ObjectId]
}, { timestamps: true });



usuarioSchema.methods.encriptarPassword = async function (password) {
    // Por si queremos guardar el salt o generar uno previamente
    // bcrypt.genSalt(10)
    await bcrypt.hash(password, 10)
        .then((pwdEncripted) => {
            console.log(pwdEncripted);
            this.usuario_hash = pwdEncripted
        }).catch((error) => {
            console.log(error);
        })
};


usuarioSchema.methods.generarJWT = function () {
    let payload = {
        usuario_id: this._id,
        usuario_nombre: this.usuario_nombre + ' ' + this.usuario_apellido,
        usuario_categoria: this.usuario_categoria
    }

    let password = process.env.JWT_SECRET || 'mongoAPI'

    // que la token expire en 1 hora
    return sign(payload, password, { expiresIn: '1h' }, { algorithm: 'RS256' });
}


usuarioSchema.methods.validarPassword = async function (password) {
    // compara la hash con la conraseña. Si son iguales retorna true, sino false
    let resultado = await bcrypt.compare(password, this.usuario_hash);
    return resultado;
}


module.exports = usuarioSchema;


/**
 * TIPOS DE DATOS:
 * String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema
 */