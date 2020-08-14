import React ,{useState,useContext}from 'react';
import {Link,useHistory} from 'react-router-dom'
import {userContext} from '../../App';
import M from 'materialize-css';



const Signin = () => {
    const history = useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {state,dispatch} = useContext(userContext)
    
    console.log(password,email);
    

    const postData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {  
            M.toast({html: 'invalid Email!',classes:"#d32f2f red darken-2"})
           return
    
        }
        
        fetch('/signin',{
     method:"post",
     headers:{
         "Content-Type":"application/json"
     },
     body:JSON.stringify({
         email,
         password
     })
    
    
        }).then((res)=>{
         return res.json()   
        }).then((data)=>{

            console.log(data);
            if(data.error){
                M.toast({html: 'User Already Exit!',classes:"#d32f2f red darken-2"})
            }
            else{

                localStorage.setItem("jwt_key",data.jwt_key);
                localStorage.setItem("user",JSON.stringify(data.user));
                dispatch({type:"USER",payload:data.user})
                M.toast({html: 'signed Succesfully',classes:"#00c853 green accent-4"})

            history.push('/')
            console.log(data);

            }
        }).catch(error=>{
            console.log(error);
        })
        
    }

   

    return (

        <div className="mycard">
            <div className="card auth-card">
                <h2>MyNetwork</h2>
                <input type="text" placeholder="email"
                 value={email}
                 onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input type="password" placeholder="password"
                 value={password}
                 onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData} >Signin
    
                 </button>
                 <h5><Link to='/signup'>Don't Have Account</Link> </h5>
            </div>
        </div>
    )
}

export default Signin;