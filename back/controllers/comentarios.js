const comentarios = require('../models/comentarios.js');
const listarPorID = async (req, res) => {
    let id = req.params.id;
    try{
        let listarComentarios = await comentarios.find(id).exec();
        res.status(200).send({
            exito: true,
            listarComentarios
        });
    } catch(error) {
        res.status(500).send({
            exito: false,
            mensaje: 'Error en la consulta'
        });
    }
};
const nuevoComentario = async (req, res) => {
    let datos = {
        postID: req.body.postID,
        userID: req.body.userID,
        contenidoComentario: req.body.contenidoComentario,
        fechaComentario: req.body.fechaComentario
    };
    try{
        const comentarioNuevo = new comentarios(datos);
        comentarioNuevo.save();
        return res.send({
            estado: true,
            mensaje: 'Comentario creado con éxito'
        });
    } catch(error) {
        return res.send({
            estado: false,
            mensaje: `error en la consulta ${error}`
        });
    }
};
const actualizarPorID = async (req, res) => {
    let id = req.params.id;
    let datos = {
        postID: req.body.postID,
        userID: req.body.userID,
        contenidoComentario: req.body.contenidoComentario,
        fechaComentario: req.body.fechaComentario
    };
    try{
        let consulta = await comentarios.findByIdAndUpdate(id, datos).exec();
        return res.send({
            estado: true,
            mensaje: 'Comentario actualizado con éxito',
            consulta: consulta
        });
    } catch(error) {
        return res.send({
            estado: false,
            mensaje: `error en la consulta ${error}`,
            consulta: consulta
        });
    }
};
const borrarPorID = async (req, res) => {
    let id = req.params.id;
    try{
        let consulta = await comentarios.findByIdAndDelete(id).exec();
        return res.send({
            estado: true,
            mensaje: 'Comentario eliminado con éxito',
            consulta: consulta
        });
    } catch(error) {
        return res.send({
            estado: false,
            mensaje: `error en la consulta ${error}`
        });
    }
};
module.exports = {
    listarPorID,
    nuevoComentario,
    actualizarPorID,
    borrarPorID
};