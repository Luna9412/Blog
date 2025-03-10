const User = require('../models/usuarios.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioNuevo = async (req, res) => {
    let data = {
        userName: req.body.userName,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
        pais: req.body.pais
    };
    const usuarioExiste = await User.findOne({userName: data.userName});
    if (usuarioExiste) {
        return res.status(400).send({
            estado: false,
            mensaje: 'El usuario ya existe'
        });
    }
    try{
        const usuarioRegistrar = new User(data);
        await usuarioRegistrar.save();
        return res.status(200).send({
            estado: true,
            mensaje: 'Usuario registrado'
        });
    } catch (error) {
        return res.status(500).send({
            estado: false,
            mensaje: `error: ${error}`
        });
    }
};
const usuarioLogin = async (req, res) => {
    let usuarioExist = await User.findOne({userName: req.body.userName});
    if (!usuarioExist) {
        return res.status(400).send({
            estado: false,
            mensaje: 'Usuario no encontrado'
        });
    }
    const token = jwt.sign({
        UsuarioID: usuarioExist.id,
        userName: usuarioExist.userName,
    },
    "seCreTo",
    {expiresIn: "1h"}
    );
    dataUser = {
        usuarioID: usuarioExist.id,
        usuario: usuarioExist.userName,
        token: token
    };
    if (bcrypt.compareSync(req.body.password, usuarioExist.passwordHash)){
        return res.status(200).send({
            estado: true,
            mensaje: 'Usuario logueado',
            infoUser: dataUser
        });
    } else{
        return res.status(400).send({
            estado: false,
            mensaje: 'Contraseña incorrecta'
        });
    }
};
const actualizarPass = async (req, res) => {
    let usuarioID = req.body.id;
    let data = {};
};
module.exports = {
    usuarioNuevo,
    usuarioLogin,
    actualizarPass
};