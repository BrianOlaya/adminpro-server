const express = require ('express');
const conectBd = require('./setup/db');
const conectDB = require('./setup/db');
const cors= require('cors');


//creando el servidor

const app = express ();

//conectar base de datos
conectDB();

//habilitar cors
app.use(cors());

//habilitar express.jason
app.use(express.json({extended: true}))

//puerto de la app
const port = process.env.port || 4000;

//importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/budget', require('./routes/budget'));
app.use('/api/spends', require('./routes/spends'));

//definiendo pagina principal
app.get('/', (req, res)=>{
    res.send('Hola mundo')
});

//inicializa la app
app.listen (port, '0.0.0.0', ()=>{
    console.log(`Server running on port ${port}`);
});
