import React ,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../App';
import M from 'materialize-css'

function Navbar() {

  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
   useEffect(()=>{
       M.Modal.init(searchModal.current)
   },[])
  const {state,dispatch}=useContext(userContext);
  const history=useHistory()
const renderList=()=>{
  if(state){
return [
  <>  
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li> <Link to="profile"  >Profile</Link></li>,
        <li  > <Link to="create"  >Upload</Link></li>,
        <li key="4"><Link to="/myfollowingpost" >following</Link></li>,
        <li style={{color:"red",padding:"0px"}}  
         > 
        
        <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
        }} >
          
          Logout
    
        </button>
        
        
        </li>,
       
       

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
    <div className="nav-wrapper white">
    {/* <Link to={state?"/":'/signin'} className="brand-logo left ">M</Link>  */}
    <Link to={state?"/":"/signin"} className="brand-logo left">MN</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
    <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
  </nav>
        );
}
export default Navbar;








