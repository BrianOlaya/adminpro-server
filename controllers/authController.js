const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }
    //extrawr emai y password
    const { email, password } = req.body;
    try {
        //revisar que sea un usuario registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //revisar el password
        const correctPassword = await bcryptjs.compare(password, user.password)
        if (!correctPassword) {
            return res.status(400).json({ msg: 'Contraseña Incorrecta' })
        }


        //si todo es correcto crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }     
        };

        //frmar el JWT

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            //mensaje de confirmacion
            res.json({ token: token });
        });


    } catch (error) {
        console.log(error)
    }

}

//obtiene que usuario esta autenticado
exports.userAuthenticated=async (req, res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json({user});
    }catch (error){
        console.log(error);
        res.status(500).json({msg:'Hubo un error'})
    }
}