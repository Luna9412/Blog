const {Schema, model} = require('mongoose');
const comentarioSchema = new Schema(
    {
        postID:{
            type: String,
            required: true
        },
        usuarioID:{
            type: String,
            required: true
        },
        contenidoComentario:{
            type: String,
            required: true
        },
        fechaComentario:{
            type: String,
            required: true
        },
    },
    { collection: 'comentarios' }
);
module.exports = model('comentarios', comentarioSchema);