const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middlewere/requireLogin')
//const Post =  mongoose.model("Post")
const User = mongoose.model("User")
//const Msg = mongoose.model("Message")
const Msg=require('../models/message');
const { populate } = require('../models/message')



router.put('/sendmessage',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$push:{
        
       messages:{
       messagedTo:req.body.userid,
       body:req.body.body
       
        },
        
       
    
    }}
        ,{new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"can't send Msg"})
         }
       
         User.findByIdAndUpdate(req.body.userid,{$addToSet:{
        
            messagedBy:req.user._id
           
             
            
         
         }}
             ,{new:true},
             (err,result)=>{
              if(err){
                  return res.status(422).json({error:"can't send Msg"})
              }
            
     
     
     
              
              res.json({result:"successfully send msg"})
         })


         
        // res.json({result:"successfully send msg"})
    })
})

// User.findByIdAndUpdate(req.body.userid,{$push:{
//     messagedBy:req.body.userid
// }}).then(result=>{
//     console.log(result)
// })



        router.post('/usermessage',requireLogin,(req,res)=>{
        // console.log(req.body.userid)
            User.find({_id:req.user._id},{
                       
                  }).then(result1=>{

                   // console.log(req.body.userid)
               


                    User.find({_id:req.body.userid},{
                       
                    }).then(result2=>{
                       
                    return res.json({messagedTo:result1,messagedBy:result2})
                      
                    }).catch(err=>{
                        
                        return res.status(422).json({error:err})
                    })
              
        
                    
                  }).catch(err=>{
                      
                      return res.status(422).json({error:err})
                  })
            
                
        
          
            }
                )

                 //  res.json(result)
                // console.log(result)
                router.put('/userallmessage',requireLogin,(req,res)=>{
                    User.findById(req.user._id,{
                     
                    },{
                        new:true
                    },(err,result)=>{
                        if(err){
                            return res.status(422).json({error:err})
                        }
                         

                       
                        // console.log(finalresult)
                        // console.log(result.messagedBy)
                      // finalresult= [...finalresult , ...result.messagedBy]
                       // console.log( finalresult)
                    //    let st=new Set(finalresult)
                    //      console.log(...st)

                         res.json({result})
                             
                    }
                    )
                })

                router.put('/allusers',requireLogin,(req,res)=>{
                  
                    User.find({_id:{$in:req.body.users}}) .then(users=>{
                        res.json({users})
                    }).catch(err=>{
                        console.log(err)
                    })
                    
                })


router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}})
    .select("_id email name")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})


module.exports = router