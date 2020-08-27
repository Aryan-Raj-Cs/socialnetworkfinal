const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middlewere/requireLogin')
//const Post =  mongoose.model("Post")
const User = mongoose.model("User")
//const Msg = mongoose.model("Message")
const Msg=require('../models/message');



router.put('/sendmessage',requireLogin,(req,res)=>{
  
    
    
    const msg= new Msg({
       body:req.body.body,
       postedBy:req.user._id,
       postedTo:req.body.userid
    })

    msg.save().then((msg)=>{
        //console.log(msg);
        res.json({message:" msg successfully save to databases"});
 
    }).catch(error=>{
     console.log(error);
    })

    }
    )
    // router.post('/usermessage',requireLogin,(req,res)=>{
       
    // Msg.find({postedTo:req.body.userid,postedBy:req.user._id},{
               
    //       }).then(result1=>{
    //         //   res.json(result)
    //         //   console.log(result1)

              
    //      Msg.find( {postedBy:req.body.userid,postedTo:req.user._id},{
               
    //     }).then(result2=>{
    //        let result = result1.concat(result2)
    //        //result.sort('createdAt')
    //         console.log(result)
    //         res.json({result})
    //         //console.log(result)
    //     }).catch(err=>{
            
    //         return res.status(422).json({error:err})
    //     })
    //       }).catch(err=>{
              
    //           return res.status(422).json({error:err})
    //       })
    
        

  
    // }
    //     )





        router.post('/usermessage',requireLogin,(req,res)=>{
       
            Msg.find({postedTo:req.body.userid,postedBy:req.user._id},{
                       
                  }).then(result=>{
                      res.json(result)
                      console.log(result)
        
                    
                  }).catch(err=>{
                      
                      return res.status(422).json({error:err})
                  })
            
                
        
          
            }
                )
    
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})



// router.post('/search-users',(req,res)=>{
//     let userPattern = new RegExp("^"+req.body.query)
//     User.find({email:{$regex:userPattern}})
//     .select("_id email")
//     .then(user=>{
//         res.json({user})
//     }).catch(err=>{
//         console.log(err)
//     })

// })


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