const jwt=require('jsonwebtoken');
require("dotenv").config();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const {JWT_SECRET}=process.env
module.exports=(req,res,next)=>{
const {authorization} = req.headers;
//console.log(req.headers,authorization);
if(!authorization){
   return res.status(400).json({"message":"you are not authorize"});
}
const token=authorization.replace("Bearer ","");
//console.log(token);
jwt.verify(token,JWT_SECRET,(error,payload)=>{
  if(error){
      return res.status(400).json({"message":"you must be loggen in"})
  }


const {_id}=payload;
//console.log(payload);
  User.findById(_id).then((userData)=>{
      req.user=userData;
      next();
  })
  


})
}