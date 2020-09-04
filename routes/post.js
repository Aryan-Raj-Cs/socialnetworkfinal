const express=require('express');
const rout=express.Router();
const Post=require('../models/post');
const requireLogin=require('../middlewere/requireLogin.js');

rout.get('/allpost',requireLogin,(req,res)=>{
    Post.find().populate("postedBy","_id name pic").populate("comments.postedBy","_id name pic").
    then((result)=>{
        res.json({posts:result})
    }).catch(error=>{
        res.json({"error":"invalid"})
    })
})

rout.get('/onepost/:postid',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postid}).populate("postedBy","_id name pic").populate("comments.postedBy","_id name").
    then((result)=>{
        console.log(result,"hello")
        res.json({posts:result})
    }).catch(error=>{
        res.json({"error":"invalid"})
    })
})


rout.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name followers following").then((user)=>{
   
       return res.json({user})
    })
   
   })



   rout.post('/createpost',requireLogin,(req,res)=>{

    const {title,body,pic}=req.body;
    console.log(title,body,pic);
    if(!title || !body||!pic ){
        return res.status(400).json({"message":"please add all the fields"});
    }
    console.log(req.user);
   
   const postUser=new Post({
       title,
       body,
       photo:pic,
       postedBy:req.user
   })
   
   postUser.save().then((user)=>{
   console.log(user);
   return res.json({result:user})
   }).catch((error)=>{
       console.log(error);
   })
    
     return res.json({result:req.user});
   
   })

   rout.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
rout.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("comments.postedBy","_id name pic")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

rout.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


rout.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})


rout.get('/getsubpost',requireLogin,(req,res)=>{

    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=rout;