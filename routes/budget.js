const express = require ('express');
const router= express.Router();
const budgetController = require ('../controllers/budgetController');
const auth = require('../middlewares/auth');
const {check}= require ('express-validator');

//crear presupuesto
//api/budget
router.post('/',
    auth, 
    [
        check('budget', 'El nombre y valor del presupuesto son obligatorios').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],  
    budgetController.createBudget
);

//obtener presupuesto por proyecto
router.get('/',
    auth,
    budgetController.getBudgetTotal
);

module.exports=router;