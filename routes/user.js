
const { Router } = require('express');
const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/userController');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);


router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROL','USER_ROL']),
    check('rol').custom(rol => esRolValido(rol)),
    validarCampos
] ,usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);


router.patch('/', usuariosPatch)

module.exports = router;