const express = require ('express');
const router= express.Router();
const spendController = require ('../controllers/spendController');
const auth = require('../middlewares/auth');
const {check}= require ('express-validator');

//crear una tarea


//api/tasks
router.post('/',
    auth, 
    [
        check('name', 'El nombbre del gasto  es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()

    ],  

    spendController.createSpend
);

//obtener los gastos por proyecto
router.get('/',
    auth,
    spendController.getSpends
);
//actualizar gastos
router.put('/:id',
    auth,
    spendController.updateSpend

);

//eliminar gasto 
router.delete('/:id',
    auth,
    spendController.deleteSpend
);


module.exports=router;