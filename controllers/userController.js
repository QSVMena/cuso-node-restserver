const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const  query = req.query;
    
    res.json({
        msg: 'get API - controlador',
        query
    })
};

const usuariosPut = (req, res) => {
    const {id} = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    })
};

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;
    
    res.status(201).json({
        msg: 'post API -  controlador',
        nombre, edad
    })
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
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