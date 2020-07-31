const express = require ('express');
const router= express.Router();
const taskController = require ('../controllers/taskController');
const auth = require('../middlewares/auth');
const {check}= require ('express-validator');

//crear una tarea


//api/tasks
router.post('/',
    auth, 
    [
        check('name', 'El nombbre de la tarea es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()

    ],  

    taskController.createTask
);

//obtener las tareas por proyecto
router.get('/',
    auth,
    taskController.getTasks
);
//actualizar tareas
router.put('/:id',
    auth,
    taskController.updateTask

);

//eliminar tarea 
router.delete('/:id',
    auth,
    taskController.deleteTask
);


module.exports=router;