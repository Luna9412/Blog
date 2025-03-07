const { Schema, model } = require('mongoose');
const publicacionesSchema = new Schema(
    {
        autor_id: {
            type: String,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        sub_titulo: {
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
        imagen: {
            type: String,
            default: "",
        },
        fecha_publicacion: {
            type: String,
            required: true
        },
    },
    { collection: 'publicaciones' }
);
module.exports = model('publicaciones', publicacionesSchema);