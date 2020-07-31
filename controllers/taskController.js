const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//crea un anueva tarea

exports.createTask = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

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

        //creamos la tarea
        const task = new Task(req.body);
        await task.save();
        res.json({ task })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}
//obtiene las tareas por proyecto
exports.getTasks = async (req, res) => {

    try {
        //Extraer el proyecto y comproobar si existe
        const { project } = req.query;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el proyectio actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //obtener las tareas por proyecto

        const tasks = await Task.find({ project }).sort({date:-1});
        res.json({ tasks })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')

    }

}

//actualizar tarea
exports.updateTask = async (req, res) => {
    try {
        //Extraer el proyecto y comprobar si existe
        const { project, name, state} = req.body;

        //si la tarea existe o no
        let task=await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg:'No existe esa tarea'});
        }

        //extraer proyecto

        const existProject = await Project.findById(project);
       
        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //crear un objeto con la nueva informacion
        const newTask={};

        newTask.name=name;
        newTask.state=state;
        
        //guardar la tarea

        task= await Task.findOneAndUpdate({_id:req.params.id}, newTask, {new:true});
        res.json({task})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//elimina una tarea
exports.deleteTask=async (req, res)=>{
    try {
        //Extraer el proyecto y comprobar si existe
        const { project} = req.query;

        //si la tarea existe o no
        let task=await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({msg:'No existe esa tarea'});
        }

        //extraer proyecto

        const existProject = await Project.findById(project);
       
        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //eliminar
        await Task.findOneAndRemove({_id: req.params.id});
        res.json ({msg:'Tarea eliminada'})
    

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
