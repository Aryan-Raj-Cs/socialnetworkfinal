const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const msgSchema = new mongoose.Schema({
    
    body:{
        type:String,
        required:true
    },
    
    photo:{
        type:String,
        //required:true
    }
    ,
    postedBy:{
       type:ObjectId,
       ref:"User"
    },
    postedTo:{
        type:ObjectId,
        ref:"User"
     }
},
{ timestamps: true }
)

module.exports=mongoose.model("Message",msgSchema)