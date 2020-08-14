import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../../App'

 const Profile=()=>{
   const [data,setData]=useState([]);
   const {state,dispatch} = useContext(userContext)
   const [image,setImage] = useState("")
   useEffect(()=>{
    
      fetch('/mypost',{
          headers:{
              "authorization":"Bearer "+localStorage.getItem("jwt_key")
          }
      }).then((res)=>res.json()).then((data)=>{
          //console.log(data.user[0])
          setData(data.user)
          //console.log(state)
         // console.log(data)
      })
      
      
      },[])


      useEffect(()=>{
        if(image){
         const data = new FormData()
         data.append('file',image);
         data.append('upload_preset',"instagram");
         data.append("cloud_name","aryanraj");
         fetch('https://api.cloudinary.com/v1_1/aryanraj/image/upload',{
             method:"post",
             body:data
         })
         .then(res=>res.json())
         .then(data=>{
     
        
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":"Bearer "+localStorage.getItem("jwt_key")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                //window.location.reload()
            })
        
         })
         .catch(err=>{
             console.log(err)
         })
        }
     },[image])
     const updatePhoto = (file)=>{
         setImage(file)
     }
      console.log(state)
    return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}> 
           <div style={{
               display:'flex',
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"solid 1px grey"
               }}>
               <div>
                 <img  style={{width:'160px',height:'160px',borderRadius:"80px"}}
                 src={state?state.pic:"loading"}
                 />
               </div>
               
               <div>
               <h4>{state?state.name:"loading"}</h4>
               <h4>{state?state.email:"loading"}</h4>
             
               <div style={{
               display:'flex',
               justifyContent:"space-around",
               width:"108%",
              
              
               }} >
              
            
                {/* <h6>{state.followers.length} Followers</h6>
                <h6>{state.following.length} Following</h6> */}
                  
                       <h6>{data.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                    
                   {/* <h6>{data[0].postedBy.followers.length} Followers</h6>
                   <h6>{data[0].postedBy.following.length} Following</h6>  */}
               </div>
               </div>
           </div>
           <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
       <div className="gallery">
          {
            data.map((val)=>{
               return (
                   <img className="iteam"
                 src={val.photo}
                 />
               )
             })   
          }
          
       </div>
      
       </div>
    )
}

export default Profile;