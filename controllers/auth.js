const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        // Verificar si el correo existe 
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correcto - email',
            })
        }

        // Verificar el estado del usuario
        if ( !usuario.state ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar si la contraseña es correcta
        const validPassword = bcryptjs.compareSync( password, usuario.password);

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contraseña'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        })

    }
}

module.exports = {
    login
}