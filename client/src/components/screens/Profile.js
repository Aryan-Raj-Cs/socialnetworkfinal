import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(userContext)
    const [image, setImage] = useState("")
    useEffect(() => {

        fetch('/mypost', {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt_key")
            }
        }).then((res) => res.json()).then((data) => {
            //console.log(data.user[0])
            setData(data.user)
            //console.log(state)
            // console.log(data)
        })


    }, [])


    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append('file', image);
            data.append('upload_preset', "instagram");
            data.append("cloud_name", "aryanraj");
            fetch('https://api.cloudinary.com/v1_1/aryanraj/image/upload', {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {


                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": "Bearer " + localStorage.getItem("jwt_key")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                            //window.location.reload()
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)
    }
    console.log(state)





    
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
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: 'flex',
                justifyContent: "space-around",
                margin: "18px 0px",
                 borderBottom: "solid 1px grey"
            }}>
                <div>
                    <img style={{ width: '100px', height: '100px', borderRadius: "80px" }}
                        src={state ? state.pic : "loading"}
                    />

               <div className="file-field input-field" style={{ marginLeft: "33px" , marginTop: "0px"}}>
                <div className="">
               
                    <i class="material-icons" style={{ color: "blue" ,fontSize:"35px"}}>local_see  </i> 
                    <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                </div>
                <strong>Profile</strong> 
                   
                
            </div>

                </div>

                <div>


                    <div style={{display:"flex"}}>
                        <div style={{border:"",paddingTop:"10px"}}><strong>{state ? state.name : "loading"}</strong>
                           
                        </div>
                        &nbsp;
                        <div style={{border:""}}><i class="material-icons" style={{ color: "blue", marginTop: "10px" }}>check_circle  </i>
                            </div>
                    </div>



                    {/* <strong>{state ? state.email : "loading"}</strong> */}
                   
                    <div style={{
                        display: 'flex',
                        justifyContent: "",
                        width: "100%",


                    }} >


                        {/* <h6>{state.followers.length} Followers</h6>
                <h6>{state.following.length} Following</h6> */}

                        <strong>{data.length} Posts &nbsp;</strong>
                        <strong>{state ? state.followers.length : "0"} Followers&nbsp; </strong>
                        <strong>{state ? state.following.length : "0"} Following </strong>

                        {/* <h6>{data[0].postedBy.followers.length} Followers</h6>
                   <h6>{data[0].postedBy.following.length} Following</h6>  */}
                   

                    </div>
                    <p></p>
                    <div className="file-field input-field" style={{ marginLeft: "70px" , marginTop: "0px"}}>
                    
                <div className="">
              
                    <i class="material-icons" style={{ color: "blue" ,fontSize:"35px"}} onClick={()=>{history.push('/create')}}>add_a_photo </i> 
                   
                </div>
              
                <strong>Photo</strong> 
                
               
                   
                
            </div>
                   
                </div>
            </div>
           
            <div className="gallery">
                {
                    data.map((val) => {
                        return (
                        <>

                       
                       
                            <div  className="iteam1">
                 
                      
                    <span> <i className="material-icons" style={{ color: "red",fontSize:"15px" }} >favorite_border</i>
                        &nbsp; <strong>{val.likes.length} </strong> &nbsp;
                        <i className="material-icons" style={{ color: "" ,fontSize:"13px"}} >forum</i>
                        &nbsp;<strong>{val.comments.length}  </strong>
                        <i className="material-icons" style={{
                           float: "right",
                           color:""
                           ,fontSize:"15px"
                        }}
                           onClick={() => deletePost(val._id)}
                        >delete</i>
                          </span> 
                        
                          {/* <div style={{marginLeft:"5px"}}> */}
                        
                         
                       
                        {/* </div> */}
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
    )
}

export default Profile;