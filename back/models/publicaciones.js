const { Schema, model } = require('mongoose');
const publicacionesSchema = new Schema(
    {
        autorID: {
            type: String,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        subTitulo: {
            type: String,
            required: true
        },
        contenido: {
            type: String,
            required: true
        },
        categoria: {
            type: String,
            required: true
        },
        imagenRuta: {
            type: String,
            default: "",
        },
        fechaPublicacion: {
            type: String,
            required: true
        },
    },
    { collection: 'publicaciones' }
);
module.exports = model('publicaciones', publicacionesSchema);