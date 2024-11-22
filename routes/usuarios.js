const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch, 
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos
], usuariosDelete);

module.exports = router