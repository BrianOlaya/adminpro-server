const Budget = require('../models/Budget');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//crea un anueva tarea

exports.createBudget= async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // //Extraer el proyecto y comproobar si existe
         const { project } = req.body;               // OJO!!! REVISAR SI ESTA LINEA  VA FUERA DEL TRY!!!!!!!

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el proyectio actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //creamos el budget
        const budget = new Budget(req.body);
         await budget.save();
        res.json({ budget })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}
// //obtiene presupuesto  por proyecto
exports.getBudgetTotal = async (req, res) => {

    try {
        //Extraer el proyecto y comproobar si existe
        const { project } = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el proyectio actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //obtener presupuesto por proyecto

        const budgetTotal = await Budget.find({ project });
        res.json({ budgetTotal })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')

    }

}

