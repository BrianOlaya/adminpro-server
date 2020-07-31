const User=require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt = require('jsonwebtoken');
const {transporter, welcome} = require('../utils/mail')

exports.createUser=async(req, res)=>{

    //revisar si hay errores
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }   

    //extraer email y password
    const {email, password}=req.body;

try{
    //revisar que el usuario registrado sea unico
    let user=await User.findOne({email});

    if (user){
        return res.status(400).json({msg:'El usuario ya existe'})
    }
    //crea nuevo usuario
    user=new User(req.body);

    //hashear el password
    const salt=await bcryptjs.genSalt(10);
    user.password=await bcryptjs.hash(password, salt)

    //guardar usuario
    await user.save();

    //crear y firmar el JWT
    const payload={
        user:{
            id:user.id
        }
    };

    // const newUser ={    //por si necesito esta especificidad par enviar el correo
    //     userName:user.name,
    //     userEmail:user.email
    // }

    const mail ={
        from:'"Admin Pro"<adprocol@aol.com>',
        to:user.email,
        subject:"Bienvenido!",
        html:welcome (user.name)
    }

    await transporter.sendMail(mail, (error)=>{
        console.log(error)
    });

    //frmar el JWT

    jwt.sign(payload, process.env.SECRET, {
        expiresIn:3600
    }, (error, token)=> {
        if (error)throw error;
        //mensaje de confirmacion
        res.json({token:token});
    });




}catch(error){
    console.log(error);
    res.status(400).send ('Algo salió mal');
}
}