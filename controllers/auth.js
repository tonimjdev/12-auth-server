const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


const crearUsuario = async(req, res = response) => {

    const { email, name, password } = req.body;

    try {

    // Verificar el email
        const usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }
    
    // Crear usuario con el modelo
    const dbUser = new Usuario( req.body );


    // Hashear (encriptar) la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );


    // Generar el JWT

    // Crear usuario de DB
    await dbUser.save();


    // Generar respuesta exitosa
    return res.status(201).json({
        ok: true,
        uid: dbUser.id,
        name,
    });






      }  catch (error) {
            console.log(error);
            return res.status(500).json ({
                ok: false,
                msg: 'Por favor, hable con el administrador'
            });
        }
    }



  



    


const loginUsuario =  (req, res ) => {

    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { email, password } = req.body;
    console.log (email, password);

    return res.json ({
        ok: true,
        msg: 'Login de usuario /'
    });
}

const revalidarToken = (req, res ) => {
    return res.json ({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}