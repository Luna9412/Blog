const {Schema, model} = require('mongoose');
const comentarioSchema = new Schema(
    {
        post_id:{
            type: String,
            required: true
        },
        usuario_id:{
            type: String,
            required: true
        },
        contenido_comentario:{
            type: String,
            required: true
        },
        fecha_comentario:{
            type: String,
            required: true
        },
    },
    { collection: 'comentarios' }
);
module.exports = model('comentarios', comentarioSchema);