const { Schema } = require('mongoose');

const imagenSchema = new Schema({
    imagen_url: String
}, { _id: false });

module.exports = imagenSchema;