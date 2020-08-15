const express=require('express');
const rout=express.Router();
const User=require('../models/user');
const crypto = require('crypto')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer')
const {JWT_SECRET,EMAIL}=process.env
const requireLogin=require('../middlewere/requireLogin.js');


let transport = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'aryanrajresonance@gmail.com', 
        pass: 'Aryan@Asha123'
    } 
}); 


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

rout.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transport.sendMail({
                    to:user.email,
                    from:"aryanrajresonance@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href=${EMAIL}/reset/${token}>link-for-password-reset</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

rout.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    console.log(typeof(sentToken))
    console.log(sentToken)
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        console.log(user)
        if(!user){
            //console.log(Date.now())
            return res.status(422).json({error:"Try again session expired "})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})



module.exports=rout;