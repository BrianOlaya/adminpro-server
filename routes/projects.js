const express = require ('express');
const router= express.Router();
const projectController = require ('../controllers/projectController');
const auth = require('../middlewares/auth');
const {check}= require ('express-validator');

//crea un proyecto
//hacia api/projects

router.post('/',    
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.createProject
);

//obtener todos los proyectos
router.get('/',    
    auth,
    projectController.getProjects
)

//actualizar proyecto via ID
router.put('/:id', 
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectController.updateProject
);

//eliminar un proyecto
router.delete('/:id', 
    auth,
    projectController.deleteProject
);


module.exports= router;