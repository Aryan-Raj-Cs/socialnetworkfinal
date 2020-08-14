import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';


const CreatePost = () => {
  const history=useHistory();
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState("");

  useEffect(()=>{
    if(url){
   
     fetch('/createpost',{
       method:"post",
       headers:{
           "Content-Type":"application/json",
           "authorization":"Bearer "+localStorage.getItem("jwt_key")
       },
       body:JSON.stringify({
           title,
           body,
           pic:url
       })
      
      
          }).then((res)=>{
           return res.json()   
          }).then((data)=>{
              //console.log(data);
              if(data.error){
                  M.toast({html: 'no post created!',classes:"#d32f2f red darken-2"})
              }
              else
              M.toast({html: 'created post Succesfully',classes:"#00c853 green accent-4"})
              history.push('/')
              console.log(data);
          }).catch(error=>{
              console.log(error);
          })
   
    }
   
   
   
    },[url])
  const postDetails=()=>{
    
    const data=new FormData();
    data.append('file',image);
    data.append('upload_preset',"instagram");
    data.append("cloud_name","aryanraj");
    fetch('https://api.cloudinary.com/v1_1/aryanraj/image/upload',{
      method:'post',
      body:data
    }).then((res)=>res.json()
    ).then((data)=>{
      console.log(data);
      setUrl(data.url)
      console.log(data.url)
      //console.log(url)
      
      
    
    }).catch((error)=>{
      console.log(error);
    })
    
   
  
    
      }




 return (

        <div className="card input-filed"
        style={{
            margin:"10px auto",
             maxWidth:"400px",
             padding:"10px",
            textAlign:"center"
       
           }}
        >
          <input type="text" placeholder="title"
                value={title}
                 onChange={(e)=>{setTitle(e.target.value)}}
                
                />
                <input type="text" placeholder="body"
                 value={body}
                 onChange={(e)=>{setBody(e.target.value)}}
                />
           <div className="file-field input-field">
           <div className="btn #64b5f6 blue darken-1">
           <span>Upload</span>
           <input type="file"
                 
           onChange={(e)=>{setImage(e.target.files[0])}}
           />
           </div>
           <div className="file-path-wrapper">
           <input className="file-path validate" type="text"/>
          </div>
          </div>
    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  onClick={postDetails}  >submit
    
    </button>
        </div>
        
    )
}

export default CreatePost;