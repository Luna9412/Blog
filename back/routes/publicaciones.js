const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones.js');

router.get('/publicaciones/listarTodo', publicacionesController.listarTodo);
router.get('/publicaciones/listarPorID/:id', publicacionesController.listarPorID);
router.post('/publicaciones/nuevaPublicacion', publicacionesController.nuevaPublicacion);
router.put('/publicaciones/actualizarPorID/:id', publicacionesController.actualizarPorID);
router.delete('/publicaciones/borrarPorID/:id', publicacionesController.borrarPorID);
module.exports = router;