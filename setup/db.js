const mongoose = require ('mongoose');
require('dotenv').config({path:'.env'});

const conectDB= async ()=> {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('DB connected');
    }catch (error){
        console.log(error);
        process.exit(1) // detiene la app si hay error
    }
}

module.exports = conectDB;