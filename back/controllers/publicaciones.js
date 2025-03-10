const publicaciones = require('../models/publicaciones.js');
let Publicaciones = require('../models/publicaciones.js');
let jwt = require('jsonwebtoken');
const comentarios = require('../models/comentarios.js');
const listarTodo = async (req, res) => {
    try{
        let listarPublicaciones = await publicaciones.find().exec();
        res.status(200).send({
            exito: true,
            listarPublicaciones
        });
    } catch (error) {
        res.status(500).send({
            exito: false,
            mensaje: 'Error en la consulta'
        });
    }
};
const listarPorIDUserPublicacion = async (req, res) => {
    let id = req.params.id;
    try{
        let listarPublicaciones = await publicaciones.find({autorID: id}).exec();
        res.status(200).send({
            exito: true,
            listarPublicaciones
        });
    } catch (error) {
        res.status(500).send({
            exito: false,
            mensaje: 'Error en la consulta'
        });
    }
};
const traerPublicacionID = async (req, res) => {
    let id = req.params.id;
    try{
        let listarPublicaciones = await publicaciones.findById(id).exec();
        res.status(200).send({
            exito: true,
            listarPublicaciones
        });
    } catch (error) {
        res.status(500).send({
            exito: false,
            mensaje: 'Error en la consulta'
        });
    }
};
const nuevaPublicacion = async (req, res) => {
    let datos = {
        autorID: req.body.autorID,
        titulo: req.body.titulo,
        subTitulo: req.body.subTitulo,
        contenido: req.body.contenido,
        categoria: req.body.categoria,
        imagenRuta: req.body.imagenRuta,
        fechaPublicacion: req.body.fechaPublicacion
    };
    try{
        const publicacionNueva = new publicaciones(datos);
        publicacionNueva.save();
        return res.status(200).send({
            estado: true,
            mensaje: 'Publicación creada con éxito'
        });
    } catch (error) {
        return res.status(500).send({
            estado: false,
            mensaje: 'Error al crear la publicación'
        });
    }
};
const actualizarPorID = async (req, res) => {
    let id = req.params.id;
    let datos = {
        autorID: req.body.autorID,
        titulo: req.body.titulo,
        subTitulo: req.body.subTitulo,
        contenido: req.body.contenido,
        categoria: req.body.categoria,
        imagenRuta: req.body.imagenRuta,
        fechaPublicacion: req.body.fechaPublicacion
    };
    try{
        let consulta = await publicaciones.findByIdAndUpdate(id, datos).exec();
        return res.send({
            estado: true,
            mensaje: 'Publicación actualizada con éxito',
            consulta: consulta
        });
    } catch (error) {
        return res.status(500).send({
            estado: false,
            mensaje: 'Error al actualizar la publicación',
            error: error
        });
    }
};
const borrarPorID = async (req, res) => {
    let id = req.params.id;
    try{
        let consulta = await publicaciones.findByIdAndDelete({_id: id}).exec();
        return res.send({
            estado: true,
            mensaje: 'Publicación eliminada con éxito',
            consulta: consulta
        });
    } catch (error) {
        return res.status(500).send({
            estado: false,
            mensaje: 'Error al eliminar la publicación',
            error: error
        });
    }
};
module.exports = {
    listarTodo,
    listarPorIDUserPublicacion,
    traerPublicacionID,
    nuevaPublicacion,
    actualizarPorID,
    borrarPorID
};