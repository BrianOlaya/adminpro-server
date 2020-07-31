const Spend = require('../models/Spend');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//crea un anueva tarea

exports.createSpend = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //Extraer el proyecto y comproobar si existe
        const { project } = req.body;//                            OJO!!! REVISAR SI ESTA LINEA  VA FUERA DEL TRY!!!!!!!

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }
        //revisar si el proyectio actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //creamos el  gasto
        const spend = new Spend(req.body);
        await spend.save();
        res.json({ spend })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}
//obtiene los gastos por proyecto
exports.getSpends = async (req, res) => {

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

        //obtener los gastos por proyecto

        const spends = await Spend.find({ project }).sort({date:-1});
        res.json({ spends })

        
        const spendsTotal = await Spend.price.find({ project })
        res.json({ spendsTotal })

        console.log(spendsTotal);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')

    }

}

//actualizar gasto
exports.updateSpend = async (req, res) => {
    try {
        //Extraer el proyecto y comprobar si existe
        const { project, name, price,} = req.body;

        //si el gasto existe o no
        let spend=await Spend.findById(req.params.id);

        if(!spend){
            return res.status(404).json({msg:'No existe ese gasto'});
        }

        //extraer proyecto

        const existProject = await Project.findById(project);
       
        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //crear un objeto con la nueva informacion
        const newSpend={};

        newSpend.name=name;
        newSpend.price=price;
        
        //guardar el gasto

        spend= await Spend.findOneAndUpdate({_id:req.params.id}, newSpend, {new:true});
        res.json({spend})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//elimina un gasto
exports.deleteSpend=async (req, res)=>{
    try {
        //Extraer el proyecto y comprobar si existe
        const { project} = req.query;

        //si el gasto existe o no
        let spend=await Spend.findById(req.params.id);

        if(!spend){
            return res.status(404).json({msg:'No existe ese gasto'});
        }

        //extraer proyecto

        const existProject = await Project.findById(project);
       
        //revisar si el proyecto actual pertenece al usuario autenticado
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //eliminar
        await Spend.findOneAndRemove({_id: req.params.id});
        res.json ({msg:'Gasto eliminada'})
    

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
