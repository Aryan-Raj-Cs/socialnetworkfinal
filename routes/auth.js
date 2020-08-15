const express=require('express');
const rout=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=process.env
const requireLogin=require('../middlewere/requireLogin.js');



rout.post('/signup',(req,res)=>{
   
    const {name,email,password,pic}=req.body;
    if(!email||!password||!name){
        res.status(404).json({"message":"enter valid details"});
    }
    User.findOne({email:email}).then((saveUser)=>{
     if(saveUser){
         return res.status(400).json({error:"user has already been there"});
     }
    bcrypt.hash(password,12).then((hasPassword)=>{
        const user= new User({
            name:name,
            email:email,
            password:hasPassword,
            pic
        })
        user.save().then((user)=>{
            console.log(user);
            res.json({message:"successfully save to databases"});
     
        }).catch(error=>{
         console.log(error);
        })
    })
  
      
   

    }).catch(error=>{
        console.log(error);
       })
    
})


rout.post('/signin',(req,res)=>{
  const {email,password} =req.body;
  
  if(!email||!password){
      res.status(404).json({"message":"enter valid details"});
  }

  User.findOne({email:email}).then((userresult)=>{
    if(!userresult){
        res.status(404).json({"error":"enter valid details"});
    }

    bcrypt.compare(password,userresult.password).then((doMatch)=>{
        if(doMatch){
           
            const jwt_key=jwt.sign({_id:userresult._id},JWT_SECRET);
            const {_id,name,email,followers,following,pic}=userresult
           

            res.json({jwt_key,user:{_id,name,email,followers,following,pic}})
        }
        else{
            res.status(405).json({"error":"not found"});
        }
    })
  })

})
module.exports=rout;