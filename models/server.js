const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios'

        //MIDDLEWARES
        this.middlewares();

        //Rutas de mi aplicacion

        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //
        this.app.use(express.static('public'))
    }

    routes() {

        //Pero aqui tenemos un problema, tenemos los controladores y las rutas juntas y hay que separar
        //mis controladores comienzan desde el (req, res) => {
        //mi ruta comienza desde  this.app.get('/api',

        this.app.use(this.usuariosPath, require('../routes/user.js')); //se hace como un middleware condicional
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;
