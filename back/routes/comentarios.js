const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios.js');

router.get('/comentarios/listarPorID/:id', comentariosController.listarPorID);
router.post('/comentarios/nuevoComentario', comentariosController.nuevoComentario);
router.put('/comentarios/actualizarPorID/:id', comentariosController.actualizarPorID);
router.delete('/comentarios/borrarPorID/:id', comentariosController.borrarPorID);
module.exports = router;