import React, { useState,useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css';

const SignUp=()=>{
const history=useHistory();
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [image,setImage] = useState("")
const [url,setUrl] = useState(undefined)
console.log(name,password,email);

useEffect(()=>{
    if(url){
        uploadFields()
    }
},[url])
const uploadPic = ()=>{
    const data=new FormData();
    data.append('file',image);
    data.append('upload_preset',"instagram");
    data.append("cloud_name","aryanraj");
    fetch('https://api.cloudinary.com/v1_1/aryanraj/image/upload',{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
       setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
}
const uploadFields = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
        return
    }
    fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
           M.toast({html:data.message,classes:"#43a047 green darken-1"})
           history.push('/signin')
       }
    }).catch(err=>{
        console.log(err)
    })
}
const postData = ()=>{
    if(image){
        uploadPic()
    }else{
        uploadFields()
    }
   
}


    return (

        <div className="mycard">
            <div className="card auth-card">
            <h4><Link  className="brand-logo "><span style={{color:""}}>Snapytalk</span></Link></h4>
                <input type="text" placeholder="name"
                value={name}
                 onChange={(e)=>{setName(e.target.value)}}
                
                />
                <input type="text" placeholder="email"
                 value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input type="password" placeholder="password"
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                />
             
         
           <div className="file-field input-field">
           <div className="">
           <i class="material-icons" style={{ color: "blue" ,fontSize:"35px"}}>local_see  </i>
           <input type="file"
                 
           onChange={(e)=>{setImage(e.target.files[0])}}
           />
           </div>
          
          </div>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData} >SignUp
    
                 </button>
                  <p><Link to='/signin'><span style={{color:"blue"}}>Already have account ?</span></Link> </p>
                 
            </div>
        </div>
    )
}

export default SignUp;