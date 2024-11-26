const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido =  async(rol = '') => {
        const existeRol = await Role.findOne({ rol });
        if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD`);
        }
}

const emailExiste = async( email = '' ) => {
    //Verificar si el correo existe
    const correoValido = await Usuario.findOne({ email });
    if (correoValido) {
        throw new Error(`El correo ${ email } ya está registrado en la BD`);
    }
}

const usuarioExistePorId = async( id ) => {
    //Verificar si el id existe
    const idExiste = await Usuario.findById( id );
    if (!idExiste) {
        throw new Error(`El id ${ id } no es válido`);
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExistePorId
}