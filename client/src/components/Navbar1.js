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
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>
          <li> <Link to="profile"  ><strong style={{color:"blue"}} >{state.name}</strong></Link></li>
          <li  > <Link to="create"  >Upload</Link></li>
          {/* <li  > <a href="create"  >Upload</a></li>, */}
          <li key="4"><Link to="/myfollowingpost" >following</Link></li>
          <li style={{color:"red",padding:"0px"}}  
           > 
          
          <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >
            
            Logout
      
          </button>
          
          
          </li>
         
         
  
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
    if(state){
  return [
    <>  
          <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black",marginLeft:"30px"}}>search</i></li>
          <li  > <a href="profile"  ><strong style={{color:"blue"}} >{state.name}</strong></a></li>
          <li  > <a href="create"  >Upload</a></li>
          <li key="4"><a href="/myfollowingpost" >following</a></li>
          <li style={{color:"red",padding:"0px"}}  
           > 
          
          <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')
          }} >
            
            Logout
      
          </button>
          
          
          </li>
          
         
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
 
    <div class="nav-wrapper white">
    <Link to={state?"/":"/signin"} className="brand-logo ">Network</Link>
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








