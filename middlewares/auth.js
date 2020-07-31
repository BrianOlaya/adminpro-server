const jwt = require('jsonwebtoken');

module.exports= function (req, res, next){
    //leer el token del header
    const token = req.header('x-auth-token');

    console.log(token)

    //revisar so no hay token
    if(!token){
        return res.status(401).json({msg:'No hay token, permiso no válido'})
    }

    //validar el token 
    try {
        const cifrated=jwt.verify(token, process.env.SECRET);
        req.user = cifrated.user;
        next()
    }catch(error) {
        res.status(401).json({msg:'Token no válido'});
    }




}