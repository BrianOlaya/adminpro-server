const mongoose= require('mongoose');

const SpendSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true,
    },
    price:{
        type:Number,
        default:0,
        required: true,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }

});

module.exports=mongoose.model('Spend', SpendSchema);