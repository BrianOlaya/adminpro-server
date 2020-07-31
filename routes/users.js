//rutas para crear usuaros
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check}= require('express-validator');

//crea un usuario
//hacia api/users

router.post('/', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password dede ser minimo de 6 caracteres').isLength({min:6})
],
userController.createUser

);

module.exports = router;
