import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../../App';
const Home = () => {


   const [allcomments, setAllcomments] = useState(false);
   const [data, setData] = useState([])
   const { state, dispatch } = useContext(userContext)
   const [comnt, setComment] = useState("");
   const clear = () => {
      setComment("");
   }
   useEffect(() => {
      fetch('/allpost', {
         headers: {
            "authorization": "Bearer " + localStorage.getItem("jwt_key")
         }
      }).then(res => res.json())
         .then(result => {
            console.log(result.posts)
            setData(result.posts)
         })
   }, [])



   const likePost = (id) => {
      fetch('/like', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("jwt_key")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
         .then(result => {
            console.log(result)
            const newData = data.map(item => {
               if (item._id == result._id) {
                  return result
               } else {
                  return item;
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })
   }


   const unlikePost = (id) => {
      fetch('/unlike', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("jwt_key")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
         .then(result => {
            console.log(result)
            const newData = data.map(item => {
               if (item._id == result._id) {
                  return result
               } else {
                  return item;
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })
   }

   const makeComment = (text, postId) => {

      if (comnt.trim().length > 0) {
         setComment("");
         setAllcomments(true)
         fetch('/comment', {
            method: "put",
            headers: {
               "Content-Type": "application/json",
               "authorization": "Bearer " + localStorage.getItem("jwt_key")
            },
            body: JSON.stringify({
               postId,
               text
            })
         }).then(res => res.json())
            .then(result => {
               console.log(result)
               const newData = data.map(item => {
                  if (item._id == result._id) {
                     return result
                  } else {
                     return item;
                  }
               })
               setData(newData)
            }).catch(err => {
               console.log(err)
            })
      }
   }



   const deletePost = (postid) => {
      fetch(`/deletepost/${postid}`, {
         method: "delete",
         headers: {
            "authorization": "Bearer " + localStorage.getItem("jwt_key")
         }
      }).then(res => res.json())
         .then(result => {
            console.log(result)
            const newData = data.filter(item => {
               return item._id !== result._id
            })
            setData(newData)
         })
   }
   const allcomment = () => {
      if (allcomments == false)
         setAllcomments(true)
      else {
         setAllcomments(false)
      }
   }

   return (
      <div className="home">


         {

            data.map(item => {

               return (


                  <div className="card home-card" key={item._id}>
                     <div style={{ display: "flex", }} >
                        <div style={{ border: "",margin:"5px" }}> 
                           <img style={{ width: '40px', height: '40px', borderRadius: "80px" }}
                              src={item.postedBy.pic}
                           />
                        </div>
                        <div style={{ border: "",marginTop:"15px" }}>
                           <span style={{ padding: "5px" }}><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}><strong style={{ color: "" }}>{item.postedBy.name}</strong>&nbsp;</Link> 
                           {/* {item.postedBy._id == state._id
                             
                             && <i className="material-icons" style={{
                                 float: "right"
                              }}
                                 onClick={() => deletePost(item._id)}
                              >delete</i>} */}

                              {false
                             
                                 || <i className="material-icons" style={{
                                     float: "right",
                                     color:"blue"
                                  }}
                                    
                                  >check_circle</i>
                              

                           }</span>

                        </div>
                     </div>
                     <div className="card-image">
                        <img src={item.photo}

                        />


                     </div>

                     <div className="card-content">
                       
                        {item.likes.includes(state._id)
                           ?
                           <i className="material-icons" style={{ color: "red",fontSize:"35px" }}
                              onClick={() => { unlikePost(item._id) }}
                           >favorite</i>
                           :
                           <i className="material-icons" style={{ color: "red",fontSize:"35px" }}
                              onClick={() => { likePost(item._id) }}
                           >favorite_border</i>
                        }
                        <h6><strong>{item.likes.length} likes</strong></h6>

                        <p><strong>{item.title}</strong></p>
                        <p><strong>{item.body}</strong></p>
                        {allcomments?<p style={{ cursor: "pointer", color: "blue" }} onClick={allcomment}><strong> Hide  comments {/*item.comments.length*/}</strong></p>:
                        <p style={{ cursor: "pointer", color: "blue" }} onClick={allcomment}><strong> Show all comments {item.comments.length}</strong></p>
                        }
                        
                        <form onSubmit={(e) => {
                           e.preventDefault()
                           makeComment(e.target[0].value, item._id)
                        }}>
                           <input type="text" placeholder="add a comment" onFocus={clear} onChange={(e) => { setComment(e.target.value) }} value={comnt} />
                        </form>
                                               
                        {
                           item.comments.map((record,index) => {
                              if(index<3)
                                    return (
                                       <>
                                    <div  style={{display:"flex"}}>
                                       <div>
                                    <img style={{color:"red",padding:"0px"}} style={{width:'40px',height:'40px',borderRadius:"80px",marginTop:"12px",border:"1px solid grey",padding:""}}
                                      src={record.postedBy.pic}
                                      />
                                      </div>
                                      <div style={{marginTop:"22px",marginLeft:"10px"}}>
                                    <span key={record._id}><span style={{ fontWeight: "500", color: "blue" }}><Link to={record.postedBy._id !== state._id ? "/profile/" + record.postedBy._id : "/profile"}><strong style={{ color: "" }}>{record.postedBy.name}</strong></Link></span> {record.text}</span>
                                    </div>
                                    </div>
                                </>
                                    )
                           })
                        }


                        {
                           item.comments.map((record, index) => {
                              if (allcomments == false) {
                                 //   if(index<5)
                                 //    return (
                                 //       <h6 key={record._id}><span style={{ fontWeight: "500" ,color:"blue"}}>{"@"+record.postedBy.name}</span> {record.text}</h6>
                                 //    )
                              }

                              else {
                                if(index>=3)
                                 return (
                                    <>
                                    <div  style={{display:"flex"}}>
                                       <div>
                                    <img style={{color:"red",padding:"0px"}} style={{width:'40px',height:'40px',borderRadius:"80px",marginTop:"12px",border:"1px solid grey",padding:""}}
                                      src={record.postedBy.pic}
                                      />
                                      </div>
                                      <div style={{marginTop:"22px",marginLeft:"10px"}}>
                                    <span key={record._id}><span style={{ fontWeight: "500", color: "blue" }}><Link to={record.postedBy._id !== state._id ? "/profile/" + record.postedBy._id : "/profile"}><strong style={{ color: "" }}>{record.postedBy.name}</strong></Link></span> {record.text}</span>
                                    </div>
                                    </div>
                                </>
                                 )
                              }
                           })
                        }


                     </div>
                  </div>

               )

            })
         }





      </div>
   )
}


export default Home