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
              <img  style={{width:'160px',height:'160px',borderRadius:"80px"}}
              src={userProfile.user.pic}
              />
            </div>
            
            <div>
            <h4>{userProfile.user.name}</h4>
            <h6>{userProfile.user.email}</h6> 
            <div style={{
            display:'flex',
            justifyContent:"space-around",
            width:"108%",
           
           
            }} >
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers?userProfile.user.followers.length:"0 "} followers</h6>
                       <h6>{userProfile.user.followers?userProfile.user.following.length:"0 "} following</h6>
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
                <img className="iteam"
              src={val.photo}
              />
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