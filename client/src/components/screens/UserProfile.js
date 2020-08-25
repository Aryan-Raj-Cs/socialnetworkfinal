import React,{useEffect,useState,useContext} from 'react'
import {userContext} from '../../App'
import {useParams} from 'react-router-dom'
 const UserProfile=()=>{
   const [userProfile,setProfile]=useState(null);
   const {state,dispatch} = useContext(userContext)
   const {userid} = useParams();
   const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
   //const [showfollow,setShowFollow] = useState(true)
  
   console.log(userid)
   useEffect(()=>{
      fetch(`/user/${userid}`,{
          headers:{
              "authorization":"Bearer "+localStorage.getItem("jwt_key")
          }
      }).then((res)=>res.json()).then((data)=>{
          console.log(data)
          setProfile(data)
         // console.log(data)
      })
      
      
      },[])



      const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem('jwt_key')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
            console.log(data);
        })
    }



    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem('jwt_key')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    return (
        <>

        {userProfile?   
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}> 
        <div style={{
            display:'flex',
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"solid 1px grey"
            }}>
            <div>
              <img  style={{width:'100px',height:'100px',borderRadius:"80px"}}
              src={userProfile.user.pic}
              />
            </div>
            
            <div>
            {/* <h6>{userProfile.user.name}</h6> */}
            <div style={{display:"flex"}}>
                        <div style={{border:"",paddingTop:"10px"}}><strong>{userProfile.user.name}</strong>
                           
                        </div>
                        &nbsp;
                        <div style={{border:""}}><i class="material-icons" style={{ color: "blue", marginTop: "10px" }}>check_circle  </i>
                            </div>
                    </div>
            <strong>{userProfile.user.email}</strong> 
            <div style={{
            display:'flex',
            justifyContent:"space-around",
            width:"100%",
           
           
            }} >
                       <strong>{userProfile.posts.length} posts&nbsp;</strong>
                       <strong>{userProfile.user.followers?userProfile.user.followers.length:"0 "} followers&nbsp;</strong>
                       <strong>{userProfile.user.followers?userProfile.user.following.length:"0 "} following</strong>
            </div>
            {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }
            </div>
        </div>
    <div className="gallery">
       {
         userProfile.posts.map((val)=>{
            return (
                <>

                <div style={{border:"",width:"100%",height:"50%"}}>
                <span> <i className="material-icons" style={{ color: "red",fontSize:"25px" }} >favorite_border</i>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <i className="material-icons" style={{ color: "blue" ,fontSize:"25px"}} >forum</i>
               
                  </span> 
                 
                   

              <div style={{marginLeft:"8px"}}>
                 <strong>{val.likes.length} </strong>
                 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <strong>{val.comments.length}  </strong>
                </div>
               

                    <img className="iteam"
                        src={val.photo}

                    />
                   </div>

                  </> 
                )
          })   
       }
       
    </div>
   
    </div>
        
        
        
        :<h2> loading....!</h2>
         }
      
       </>
    )
}

export default UserProfile;