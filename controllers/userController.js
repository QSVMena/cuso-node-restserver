const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario.js');


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite)); //para que en el get puedas escribir limit=5 en numeros

    // const total = await Usuario.countDocuments({ estado: true });

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        msg: 'get API - controlador',
        total, 
        usuarios
    })
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: validar en base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'put API - controlador',
        id,
        usuario
    })
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en bd
    await usuario.save()

    res.status(201).json({
        msg: 'post API -  controlador',
        usuario
    })
};

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    //eliminar 
    // const usuario = await Usuario.findByIdAndDelete(id)

    //cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado : false})

    res.json({
        msg: 'delete API - controlador',
        usuario
    })
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}