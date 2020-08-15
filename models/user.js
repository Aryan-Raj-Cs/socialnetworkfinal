const mongoose =require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const ueserSchema=new mongoose.Schema({

      name:{
          type:String,
          required:true
      },
      email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    pic:{
        type:String,
        default:"https://res.cloudinary.com/aryanraj/image/upload/v1597340713/download_pfd4lm.png"
       },
    

})

module.exports=mongoose.model('User',ueserSchema);