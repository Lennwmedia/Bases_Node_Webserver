const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.usuariosPath = '/api/usuarios'

        // Middlewares 
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() )

        //Ruta Pública
        this.app.use(express.static('public'));

        //Leer y Parsear data
        this.app.use( express.json() )
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Utilizando el puerto:', this.port);
        })
    }
}

module.exports = Server;