const mongoose = require('mongoose');
const conexion = async () => {
    try{
        await mongoose.connect('mongodb://localhost:127.0.0.1:27017/blog');
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log(`Error e nla conexion: ${error}`);
    }
};
module.exports = conexion;