const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.js');

router.post('/usuarios/nuevoUsuario', usuariosController.nuevoUsuario);
router.post('/usuarios/login', usuariosController.login);
router.put('/usuarios/actualizarPorID/:id', usuariosController.actualizarPorID);
module.exports = router;