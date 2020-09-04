import React,{useEffect,useState,useContext,useRef} from 'react'
import {userContext} from '../../App'
import {useParams} from 'react-router-dom'
import tenor from './tenor.gif';
import M from 'materialize-css'

 const UserProfile=()=>{
    let inputFile = '';
    const  searchModal2 = useRef(null)
   const [msg,setMsg]=useState("")
   const [allmessage,setAllmessage]=useState([])
   const [userProfile,setProfile]=useState(null);
   const {state,dispatch} = useContext(userContext)
   const {userid} = useParams();
   const [search,setSearch] = useState('')
   const [msgDetails,setMsgDetails] = useState([])
   const user=JSON.parse(localStorage.getItem('user'))
//    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
   //const [showfollow,setShowFollow] = useState(true)
   const [showfollow,setShowFollow] = useState(user?!user.following.includes(userid):true)
   const clear = () => {
    setMsg("");
 }
   useEffect(()=>{
    
    M.Modal.init(searchModal2.current)
  
},[])
  // console.log(userid)
   useEffect(()=>{
      fetch(`/user/${userid}`,{
          headers:{
              "authorization":"Bearer "+localStorage.getItem("jwt_key")
          }
      }).then((res)=>res.json()).then((data)=>{
          console.log(data)
          setProfile(data)
          userMessage(userid)
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


    const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
         // setUserDetails(results.user)
        })
      }
const userMessage=(userid)=>{
  fetch('/usermessage', {
    method: "post",
    headers: {
       "Content-Type": "application/json",
       "authorization": "Bearer " + localStorage.getItem("jwt_key")
    },
    body: JSON.stringify({
       userid,
      
    })
 }).then(res => res.json())
    .then(result => {
      let message=[];
      console.log(result.messagedBy[0].messages,result.messagedTo[0].messages)
     if(result.messagedBy[0].messages.length>0 || result.messagedTo[0].messages.length>0){
      result.messagedBy[0].messages= result.messagedBy[0].messages.filter(item=>{
       return item.messagedTo==user._id
      })
      result.messagedTo[0].messages= result.messagedTo[0].messages.filter(item=>{
        return item.messagedTo==userid
       })
      console.log( result.messagedBy[0].messages)
      message=[...result.messagedBy[0].messages,...result.messagedTo[0].messages]
      console.log(message)
      console.log(message.sort(function(a,b){
      
  if((a.createdAt)>(b.createdAt)){
    return  1
  }
  else{
    return -1
  }

  
}))
     }



       setMsgDetails(message)
       //setData(newData)
    }).catch(err => {
       console.log(err)
    })


}
      const makeMsg = (body, userid) => {

        if (msg.trim().length > 0) {
           setMsg("");
           console.log(body,userid)
           fetch('/sendmessage', {
              method: "put",
              headers: {
                 "Content-Type": "application/json",
                 "authorization": "Bearer " + localStorage.getItem("jwt_key")
              },
              body: JSON.stringify({
                 userid,
                 body
              })
           }).then(res => res.json())
              .then(result => {
                 console.log(result)
                 userMessage(userid)
                 
                 //setData(newData)
              }).catch(err => {
                 console.log(err)
              })
        }
     }
  

    return (
        <>
 

        {userProfile?   
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}> 
        
        <div id="modal2"  ref={searchModal2} style={{color:"black"}}>
          <div className="modal-content">
         
             <ul className="collection">
                {/* {msgDetails.map(item=>{
                 return <a href={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal2.current).close()
                   //setSearch('')
                 }}>
                   {item.postedBy._id==state._id
                   
                   ?<li   className="collection-item">{" -> "+item.body}</li>:
                   <li className="collection-item">{item.body}</li> 
                   }</a> 
                   
                   
               })}  */}


                {msgDetails.map(item=>{
               
                   
                   
              
               return <div > {item.messagedTo!=userid? <div className="chat1" ><strong>{item.body}</strong></div>:<div className="chat2"><strong>{item.body}</strong></div> }

               </div>
                  
                   
                   
               })} 
               
              </ul>
              <form onSubmit={(e) => {
                           e.preventDefault()
                           console.log(e.target[0])
                           makeMsg(e.target[0].value, userid)
                          }}>
                           <input type="text" placeholder="Send message" onFocus={clear} onChange={(e) => { setMsg(e.target.value) }} value={msg} />
               </form>
                                   
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
    </div>
        
        
        
        :
        <div >
         
        <img className="loading" src={tenor} />
        
        </div>
         }
     
       </>
    )
}

export default UserProfile;