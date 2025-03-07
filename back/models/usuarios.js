const { Schema, model } = require('mongoose');
const usuarioSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        pais: {
            type: String,
            required: true
        }
    },
    { collection: 'usuarios' }
);
module.exports = model('usuarios', usuarioSchema);