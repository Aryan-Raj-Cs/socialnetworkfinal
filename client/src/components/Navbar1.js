import React ,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../App';
import M from 'materialize-css'

function Navbar() {

  const  searchModal = useRef(null)
  const  searchModal1 = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
   useEffect(()=>{
       M.Sidenav.init(searchModal.current)
       M.Modal.init(searchModal1.current)
   },[])
  const {state,dispatch}=useContext(userContext);
  const history=useHistory()
  const renderList=()=>{
    if(state){
  return [
    <>  
    
  
          <li className="banner" >
            <Link to="profile" ><img style={{color:"red",padding:"0px"}} style={{width:'40px',height:'40px',borderRadius:"80px",marginTop:"15px"}}
              src={state.pic}
              />
              </Link>
              </li>
         
          {/* <li> <i class="material-icons"  style={{color:"blue"}}>check_circle  </i></li> */}
         
          <li> <Link to="/"  ><i class="material-icons">home</i></Link></li>
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
          <li> <Link to="create"  ><i class="material-icons">local_see</i></Link></li>
          <li> <Link to="trending"  ><i class="material-icons"> album</i></Link></li>
          <li> <Link to="myfollowingpost"  ><i class="material-icons">rss_feed</i></Link></li>
          <li> <Link   ><i class="material-icons"  onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >settings_power</i></Link></li>
          
          {/* <li style={{color:"red",padding:"0px"}}  
           > 
          
          <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >
            
            Logout
      
          </button>
          
          
          </li> */}
         
         
  
          </>
  
  ]
  
    }
  
    else{
   return [
  
          <li> <Link to="/signin">Login</Link></li>,
          <li> <Link to="signup">Signup</Link></li>
        
  
   ]
    }
  }


  const renderList1=()=>{
    console.log(state)
    if(state){
  return [
    <>  
         
         <a href="profile" ><img style={{color:"red",padding:"0px"}} style={{width:'40px',height:'40px',borderRadius:"80px",marginTop:"15px"}}
              src={state.pic}
              />
              </a>
        
          <li> <a href="/"  ><i class="material-icons">home</i></a></li>
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black",marginLeft:"30px"}}>search</i></li>
          <li> <a href="create"  ><i class="material-icons">local_see</i></a></li>
          <li> <a href="trending"  ><i class="material-icons"> album</i></a></li>
          <li> <a href="myfollowingpost"  ><i class="material-icons">rss_feed</i></a></li>
          <li> <Link   ><i class="material-icons"  onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >settings_power</i></Link></li>
          {/* <li style={{color:"red",padding:"0px"}} 
           
           > 
          
            
          
          <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >
            
            Logout
      
          </button>
          
          
          </li> */}
          
         
          </>
  
  ]
  
    }
  
    else{
   return [
  
          <li> <a href="/signin">Login</a></li>,
          <li> <a href="signup">Signup</a></li>
        
  
   ]
    }
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
      setUserDetails(results.user)
    })
  }

  
  return (
     <nav>
 
    <div class="nav-wrapper white over">
    <Link to={state?"/":"/signin"} className="brand-logo "><span style={{color:""}}>SnapTalk</span></Link>
             
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        {/* <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li> */}

      {renderList()}
      </ul>

    </div>
 <div id="modal1" class="modal" ref={searchModal1} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <a href={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal1.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></a> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>

  <ul class="sidenav" id="mobile-demo" ref={searchModal}>
    {/* <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li> */}

   {renderList1()}
  </ul>
          
  
     
  
  </nav>
        );
}
export default Navbar;








