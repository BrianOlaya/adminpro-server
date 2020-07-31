//rutas para autenticar usuaros
const express = require('express');
const router = express.Router();
const {check}= require('express-validator');
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth');

//Iniciar sesion
//hacia api/auth

router.post('/', 
    authController.authUser
);
//obtiene usuario atuneticado
router.get('/',
auth,
authController.userAuthenticated
)
 
module.exports = router;
