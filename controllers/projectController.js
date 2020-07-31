const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //crear nuevo proyecto 
        const project = new Project(req.body);

        //guardar el creador del proyecto via JWT
        project.creator = req.user.id;

        //guardar el proyecto
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//obtiene todos loa proyectos del usuario actual
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({ date: -1 })
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un eror')
    }
}

//actualiza un proyecto
exports.updateProject = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extraer la informacion del proyecto
    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        //revisar el ID
        let project = await Project.findById(req.params.id);

        //validar si el proyecto exsite
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }


        //verificar el creador del proyecto
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //actualizar
        project = await Project.findByIdAndUpdate({ _req: req.params.id }, { $set: newProject }, { new: true });
        res.json({ project });

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}
//elimina un proyecto por si ID
exports.deleteProject = async (req, res) => {
    try {
        //revisar el ID
        let project = await Project.findById(req.params.id);

        //validar si el proyecto exsite
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }


        //verificar el creador del proyecto
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //eliminar el proyecto

        await Project.findOneAndRemove({_id: req.params.id});
        res.json({msg:'Proyecto eliminado'})


    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
} 
