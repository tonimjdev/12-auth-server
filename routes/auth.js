const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear un nuevo usuario
router.post( '/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio, mínimo 6 carácteres').isLength({ min: 6 }),
    validarCampos
] ,crearUsuario );

// Login de usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio, mínimo 6 carácteres').isLength({ min: 6 }),
] ,loginUsuario );

// Validar y revalidar token
router.get( '/renew', validarJWT, revalidarToken );



module.exports = router;
